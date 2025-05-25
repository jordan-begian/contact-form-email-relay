terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

module "cloud_run" {
  source  = "GoogleCloudPlatform/cloud-run/google"
  version = "0.17.4"

  service_name          = var.service_name
  project_id            = var.project_id
  location              = var.region
  image                 = var.container_image
  service_account_email = var.service_account_email
  members               = ["allUsers"]

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
