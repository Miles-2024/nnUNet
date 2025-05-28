// tests/e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('should navigate to the home page and find welcome message', async ({ page }) => {
  await page.goto('/'); // Assumes baseURL is 'http://localhost:3000'
  
  // Check for the heading
  const heading = page.getByRole('heading', { name: /Welcome to MengZhiyi-Medical Suite/i });
  await expect(heading).toBeVisible();

  // Check for the navigation links
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Upload' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
});

test('should navigate to upload page and see dropzone', async ({ page }) => {
  await page.goto('/upload');
  
  const dropzoneText = page.getByText(/Drag 'n' drop DICOM or NIfTI files here/i);
  await expect(dropzoneText).toBeVisible();
});
