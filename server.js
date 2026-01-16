#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port and directory from command line arguments
const port = process.env.PORT || 8080;
const directory = process.argv[2] || 'dist';

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.manifest': 'text/cache-manifest',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  // Clean URL (remove query parameters, normalize path)
  let filePath = decodeURIComponent(req.url.split('?')[0]);

  // Root path to index.html
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Full file path
  const fullPath = path.join(__dirname, directory, filePath);

  // Security check: Prevent directory traversal
  const requestedPath = path.normalize(fullPath);
  const basePath = path.normalize(path.join(__dirname, directory));

  if (!requestedPath.startsWith(basePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Read file
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // File not found
      if (err.code === 'ENOENT') {
        // For SPA: Redirect all routes to index.html
        const indexPath = path.join(__dirname, directory, 'index.html');
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html',
              'Cache-Control': 'no-cache'
            });
            res.end(data);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    // Determine MIME type
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Caching headers for static assets
    const cacheControl = ext.match(/\.(html|json|manifest)$/)
      ? 'no-cache'
      : 'public, max-age=31536000'; // 1 year for assets

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

// Start server
server.listen(port, '0.0.0.0', () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';

  // Find local IP address
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      // IPv4, not localhost, not internal
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
    if (localIP !== 'localhost') break;
  }

  console.log('\n🚀 HTTP Server started!\n');
  console.log(`📱 Local IP address: http://${localIP}:${port}`);
  console.log(`💻 Localhost:        http://localhost:${port}`);
  console.log(`\n📂 Serving from: ${path.join(__dirname, directory)}`);
  console.log(`\n📱 Open on smartphone:`);
  console.log(`   1. Connect smartphone to the same WiFi network`);
  console.log(`   2. Open browser on smartphone`);
  console.log(`   3. Go to: http://${localIP}:${port}`);
  console.log(`\n⏹️  Stop server: Ctrl+C\n`);
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use!`);
    console.error(`💡 Use a different port: PORT=8081 npm run serve`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
