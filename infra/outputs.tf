output "dicom_uploads_bucket_name" {
  description = "Name of the GCS bucket for DICOM uploads"
  value       = google_storage_bucket.dicom_uploads.name
}

output "postgres_db_instance_connection_name" {
  description = "Connection name for the PostgreSQL database instance"
  value       = google_sql_database_instance.postgres_db.connection_name
}

output "postgres_db_name" {
  description = "Name of the PostgreSQL database"
  value       = google_sql_database.app_db.name
}
