variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region to deploy to"
  type        = string
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "container_image" {
  description = "The container image to deploy (e.g. gcr.io/project/image:tag)"
  type        = string
}

variable "cloud_run_service_account_email" {
  description = "The email of the service account to use for the Cloud Run service"
  type        = string
}

variable "node_env" {
  description = "The Node.js environment (e.g. production, development)"
  type        = string
}

variable "google_user_account" {
  description = "The Google user account for the API"
  type        = string
}

variable "google_client_id" {
  description = "The Google client ID for the API"
  type        = string
}

variable "google_client_secret" {
  description = "The Google client secret for the API"
  type        = string
}

variable "google_refresh_token" {
  description = "The Google refresh token for the API"
  type        = string
}

variable "destination_email" {
  description = "The destination email address for relayed messages"
  type        = string
}

variable "origins_file_path" {
  description = "The path to the CORS origins config file"
  type        = string
}

variable "bucket_name" {
  description = "The name of the Cloud Storage bucket to create"
  type        = string
}

variable "gh_actions_service_account_email" {
  description = "The email of the GitHub Actions service account for Cloud Storage"
  type        = string
}

variable "commit_sha" {
  description = "The commit SHA for labeling the Cloud Run service"
  type        = string
}
