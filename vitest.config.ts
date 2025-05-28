// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // If testing React components

export default defineConfig({
  plugins: [react()], // Add if you're testing React components
  test: {
    globals: true,
    environment: 'jsdom', // For testing components that interact with DOM
    setupFiles: './tests/setupVitest.ts', // Optional setup file
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx'],
  },
});
