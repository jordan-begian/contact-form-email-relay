terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }

  backend "gcs" {
    prefix  = "terraform/state"
  }

  required_version = ">= 1.3.0"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

locals {
  bucket_name = "${var.service_name}-${var.bucket_name}"
}

module "cloud-storage" {
  source  = "terraform-google-modules/cloud-storage/google"
  version = "11.0.0"

  project_id = var.project_id
  location   = var.region
  names      = [local.bucket_name]

  admins     = [var.gh_actions_service_account_email]
  versioning = { (local.bucket_name) = true }
  force_destroy = { (local.bucket_name) = false }
}

module "cloud_run" {
  source  = "GoogleCloudPlatform/cloud-run/google"
  version = "0.17.4"

  service_name          = var.service_name
  project_id            = var.project_id
  location              = var.region
  image                 = var.container_image
  service_account_email = var.cloud_run_service_account_email
  members               = ["allUsers"]

  timeout_seconds = 3600
  ports = { "name" = "http1", "port"= 8080 }

  template_annotations = {
    "autoscaling.knative.dev/minScale": 0,
    "autoscaling.knative.dev/maxScale": 1,
    "generated-by": "terraform",
    "run.googleapis.com/client-name": "terraform"
  }

  template_labels = {
    "commit-sha": var.commit_sha,
    "goog-terraform-provisioned": true,
    managed-by = "github-actions"
  }

  env_vars = [
    { name = "NODE_ENV", value = var.node_env },
    { name = "GOOGLE_USER_ACCOUNT", value = var.google_user_account },
    { name = "GOOGLE_CLIENT_ID", value = var.google_client_id },
    { name = "GOOGLE_CLIENT_SECRET", value = var.google_client_secret },
    { name = "GOOGLE_REFRESH_TOKEN", value = var.google_refresh_token },
    { name = "DESTINATION_EMAIL", value = var.destination_email },
    { name = "ORIGINS_FILE_PATH", value = var.origins_file_path },
  ]
}
