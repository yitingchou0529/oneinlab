import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

// 確保根目錄與 public 目錄下的 about-me 資料夾均能在開發環境直接讀取，並於打包時同步輸出至 dist/about-me
function aboutMeStaticPlugin(): Plugin {
  return {
    name: 'about-me-static-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/about-me/') || req.url.startsWith('/oneinlab/about-me/'))) {
          const cleanUrl = req.url.replace(/^\/(?:oneinlab\/)?about-me\//, '');
          const relativePath = decodeURIComponent(cleanUrl.split('?')[0]);
          const possiblePaths = [
            path.resolve(__dirname, 'about-me', relativePath),
            path.resolve(__dirname, 'public', 'about-me', relativePath),
          ];
          for (const filePath of possiblePaths) {
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
              };
              res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
              return fs.createReadStream(filePath).pipe(res);
            }
          }
        }
        next();
      });
    },
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'about-me');
      const distDir = path.resolve(__dirname, 'dist', 'about-me');
      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          const srcFile = path.join(srcDir, file);
          const destFile = path.join(distDir, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
      }
    },
  };
}

export default defineConfig({
  // 使用相對路徑 './'，無論部署於根網域、AI Studio 預覽或 GitHub Pages 子路徑 (/oneinlab/) 皆可完美載入
  base: './',
  plugins: [react(), tailwindcss(), aboutMeStaticPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  define: {
    'process.env': {},
  },
});

