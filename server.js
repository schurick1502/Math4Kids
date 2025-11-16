#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port und Ordner aus Kommandozeilen-Argumenten
const port = process.env.PORT || 8080;
const directory = process.argv[2] || 'dist';

// MIME-Types
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
  // URL bereinigen (Query-Parameter entfernen, Pfad normalisieren)
  let filePath = decodeURIComponent(req.url.split('?')[0]);
  
  // Root-Pfad zu index.html
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Vollständiger Dateipfad
  const fullPath = path.join(__dirname, directory, filePath);
  
  // Sicherheitsprüfung: Verhindere Directory Traversal
  const requestedPath = path.normalize(fullPath);
  const basePath = path.normalize(path.join(__dirname, directory));
  
  if (!requestedPath.startsWith(basePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }
  
  // Datei lesen
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // Datei nicht gefunden
      if (err.code === 'ENOENT') {
        // Bei SPA: Alle Routen zu index.html umleiten
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
    
    // MIME-Type bestimmen
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Caching-Header für statische Assets
    const cacheControl = ext.match(/\.(html|json|manifest)$/) 
      ? 'no-cache' 
      : 'public, max-age=31536000'; // 1 Jahr für Assets
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

// Server starten
server.listen(port, '0.0.0.0', () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';
  
  // Lokale IP-Adresse finden
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      // IPv4, nicht localhost, nicht intern
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
    if (localIP !== 'localhost') break;
  }
  
  console.log('\n🚀 HTTP-Server gestartet!\n');
  console.log(`📱 Lokale IP-Adresse: http://${localIP}:${port}`);
  console.log(`💻 Localhost:        http://localhost:${port}`);
  console.log(`\n📂 Wird bereitgestellt aus: ${path.join(__dirname, directory)}`);
  console.log(`\n📱 Auf Smartphone öffnen:`);
  console.log(`   1. Verbinde Smartphone mit demselben WiFi-Netzwerk`);
  console.log(`   2. Öffne Browser auf Smartphone`);
  console.log(`   3. Gehe zu: http://${localIP}:${port}`);
  console.log(`\n⏹️  Server stoppen: Strg+C\n`);
});

// Fehlerbehandlung
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} ist bereits belegt!`);
    console.error(`💡 Verwende einen anderen Port: PORT=8081 npm run serve`);
  } else {
    console.error('❌ Server-Fehler:', err);
  }
  process.exit(1);
});

