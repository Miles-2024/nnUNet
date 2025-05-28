// app/projects/page.tsx
'use client';

import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectsPage() {
  // TODO: The API currently returns { jobs: [] }, update when API is functional
  const { data, error, isLoading } = useSWR('/api/jobs', fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
  });

  if (error) return <div>Failed to load jobs: {error.message}</div>;
  if (isLoading) return <div>Loading jobs...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Projects & Job Status</h1>
      {/* TODO: Improve rendering once the actual job structure is defined */}
      {data && data.jobs && data.jobs.length > 0 ? (
        <ul>
          {data.jobs.map((job: any) => (
            <li key={job.id}>
              Job ID: {job.id} - Status: {job.status} - Model: {job.model}
              {/* TODO: Add link to results page: <a href={`/results/${job.id}`}>View Results</a> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
      <p style={{marginTop: '20px'}}>
        {/* TODO: Add a link to the upload page */}
        {/* <a href="/upload">Upload New Scan</a> */}
      </p>
    </div>
  );
}
