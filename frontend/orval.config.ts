import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "split",
      target: "orval/api/api.ts",
      schemas: "orval/api/model",
      client: "axios-functions",
      override: {
        mutator: {
          path: "./orval/custom-instance.ts",
          name: "customInstance",
        },
      },
      mock: false,
      prettier: true,
    },
    input: {
      target: "http://localhost:8080/v3/api-docs.yaml",
    },
  },
});
