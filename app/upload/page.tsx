// app/upload/page.tsx
'use client'; // Required for event handlers and hooks

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadPage() {
  const [jobResponse, setJobResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const file = acceptedFiles[0];
    // TODO: Implement actual signed URL generation and file upload to GCS here.
    // For now, we'll simulate this and send dummy data to the /api/jobs endpoint.
    const dummySignedGCSUrl = `gs://your-bucket/uploads/${file.name}`;

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: 'Task08_Kits', // Example model, make this selectable
          signedGCSUrlList: [dummySignedGCSUrl], // Placeholder
          fileName: file.name, // Include filename for the backend
        }),
      });
      if (!response.ok) {
        throw new Error(`Error creating job: ${response.statusText}`);
      }
      const data = await response.json();
      setJobResponse(data);
      setError(null);
      // TODO: Redirect to projects page or show a success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setJobResponse(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/dicom': ['.dcm'], 'application/nifti': ['.nii', '.nii.gz'] }, // Adjust as needed
    multiple: false,
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload CT/MRI Scans</h1>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop DICOM or NIfTI files here, or click to select files</p>
        )}
      </div>
      {jobResponse && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h2>Job Created Successfully:</h2>
          <pre>{JSON.stringify(jobResponse, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      <p style={{ marginTop: '20px' }}>
        {/* TODO: Add a link to the projects page */}
        {/* <a href="/projects">View Projects</a> */}
      </p>
    </div>
  );
}
