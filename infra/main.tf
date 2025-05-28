terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  # backend "gcs" {
  #   bucket  = "your-terraform-state-bucket-name" # TODO: Replace with your GCS bucket for Terraform state
  #   prefix  = "mengzhiyi-medical/state"
  # }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

resource "google_storage_bucket" "dicom_uploads" {
  name          = "${var.gcp_project_id}-dicom-uploads" # Example bucket name
  location      = var.gcp_region
  storage_class = "STANDARD"
  uniform_bucket_level_access = true

  # TODO: Add lifecycle rules, versioning, IAM policies as needed
}

resource "google_sql_database_instance" "postgres_db" {
  name             = "${var.gcp_project_id}-postgres-db" # Example instance name
  database_version = "POSTGRES_14" # TODO: Choose appropriate version
  region           = var.gcp_region

  settings {
    tier    = "db-f1-micro" # TODO: Choose appropriate machine type for production
    # backup_configuration {
    #   enabled = true
    # }
    # ip_configuration {
    #   authorized_networks {
    #     value = "0.0.0.0/0" # TODO: Restrict access appropriately
    #   }
    # }
  }
  # deletion_protection = true # Recommended for production
}

resource "google_sql_database" "app_db" {
  name     = "mengzhiyi_medical_db"
  instance = google_sql_database_instance.postgres_db.name
}

# TODO:
# - Add resource for a PostgreSQL user and manage its password (e.g., using random_password).
# - Configure networking (VPC, private IP for Cloud SQL) for better security.
# - Set up IAM permissions for resources.
# - Consider using Google Secret Manager for database credentials.
