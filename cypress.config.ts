import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        server: {
          host: '127.0.0.1'
        }
      }
    },
  }
});
