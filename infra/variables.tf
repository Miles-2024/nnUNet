variable "gcp_project_id" {
  description = "Google Cloud Project ID"
  type        = string
  # default     = "your-gcp-project-id" # TODO: Set your GCP project ID
}

variable "gcp_region" {
  description = "Google Cloud Region"
  type        = string
  default     = "us-central1" # TODO: Set your preferred region
}
