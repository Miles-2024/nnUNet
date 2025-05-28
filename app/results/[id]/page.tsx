// app/results/[id]/page.tsx
'use client';

import React from 'react';
// import { Primitive } from '@radix-ui/react-primitive'; // Example import

// If using Next.js 13+ App Router, params are passed directly
export default function ResultPage({ params }: { params: { id: string } }) {
  const jobId = params.id;

  // TODO: Fetch job details and result data using SWR based on jobId
  // For now, use mock data for the mask URL
  const mockMaskGcsUrl = `gs://your-bucket-name/results/${jobId}/${jobId}_mask.nii.gz`;
  const slicerDownloadFileName = `${jobId}_slicer_download.slicer-download.json`;

  const generateSlicerFileContent = () => {
    // TODO: Replace with actual data, especially the mask URL after it's uploaded
    // and other relevant metadata.
    const content = {
      // Schema based on typical .mrb download, adjust if Slicer expects something different for direct mask loading
      // This structure is a guess and needs verification with Slicer's URL scheme documentation for masks.
      // It might be simpler, e.g., just the URL to the mask itself if Slicer handles that directly.
      // Or it might involve MONAILabel specific fields if that's the integration path.
      name: `${jobId}_segmentation_mask`,
      type: "segmentation", // Or "volume", "labelmap" - check Slicer docs
      url: mockMaskGcsUrl, // This should be a publicly accessible or pre-signed URL if Slicer is fetching directly
      // Additional metadata Slicer might use:
      // patientID: "Patient123",
      // studyUID: "StudyXYZ",
      // seriesUID: "SeriesABC",
      // timestamp: new Date().toISOString(),
    };
    return JSON.stringify(content, null, 2);
  };

  const handleOpenInSlicer = () => {
    const fileContent = generateSlicerFileContent();
    const blob = new Blob([fileContent], { type: 'application/json' }); // Correct MIME type
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = slicerDownloadFileName; // This is the file that gets downloaded
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Attempt to open with Slicer's URL scheme
    // The content of .slicer-download.json might be passed differently
    // or Slicer might expect to be passed the URL to the .slicer-download.json file itself.
    // This needs verification. For now, we assume downloading the file is the first step.
    // A more direct approach, if supported by Slicer:
    // window.location.href = `slicer://viewer/download?url=${encodeURIComponent(mockMaskPublicUrl)}`;
    // Or if it uses the .slicer-download.json file:
    // window.location.href = `slicer://viewer/load?json_url=${encodeURIComponent(public_url_to_the_slicer_json_file)}`;

    alert(`
      A .slicer-download.json file has been downloaded.
      If 3D Slicer is configured correctly with its URL scheme handler,
      it might have tried to open it.

      You may need to manually open the downloaded file with 3D Slicer or
      ensure the slicer:// URL scheme is registered and working.

      The downloaded file contains:
      ${fileContent}
    `);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <h1>Results for Job ID: {jobId}</h1>
        <p>
          Placeholder for MPR viewport and 3D model rendering.
          Mock Mask URL (for dev): {mockMaskGcsUrl}
        </p>
        <div style={{ marginTop: '20px' }}>
          <button disabled style={{ marginRight: '10px' }}>Download NIfTI Mask</button>
          <button disabled style={{ marginRight: '10px' }}>Download STL</button>
          <button disabled style={{ marginRight: '10px' }}>Download FBX</button>
          <button disabled style={{ marginRight: '10px' }}>Download CSV Metrics</button>
          <button onClick={handleOpenInSlicer}>Open in 3D Slicer</button>
        </div>
        <p style={{marginTop: '20px'}}>
          {/* <a href="/projects">Back to Projects</a> */}
        </p>
      </div>
    </div>
  );
}
