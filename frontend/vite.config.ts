import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/belcor': {
          target: env.VITE_PROXY_URL || "http://localhost:5001",
          changeOrigin: true, 
        }
      }
    }
  };
});