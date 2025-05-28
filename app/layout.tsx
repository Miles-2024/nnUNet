// app/layout.tsx
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Add a proper navigation header/sidebar */}
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <a href="/" style={{ marginRight: '15px' }}>Home</a>
          <a href="/upload" style={{ marginRight: '15px' }}>Upload</a>
          <a href="/projects">Projects</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
