// app/api/jobs/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: Implement actual job creation logic
  const data = await request.json();
  console.log('Received job creation request:', data);
  return NextResponse.json({ message: 'Job created successfully', data });
}

export async function GET() {
  // TODO: Implement actual logic to fetch jobs
  console.log('Received request to fetch jobs');
  return NextResponse.json({ jobs: [] }); // Return empty array for now
}
