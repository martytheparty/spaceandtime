import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Replace with the Angular dev server URL
    supportFile: 'cypress/support/e2e.ts',
  },
});
