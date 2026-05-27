#!/usr/bin/env node

/**
 * Simple HTTP Server for Photo Album Pro
 * Usage: node server.js [port]
 * Default port: 3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || process.argv[2] || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      return;
    }

    const mimeType = getMimeType(filePath);
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Normalize path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Build file path
  let filePath = path.join(ROOT_DIR, pathname);

  // Security: Prevent directory traversal
  const realPath = path.resolve(filePath);
  if (!realPath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden', 'utf-8');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file not found and not index.html, serve index.html (SPA routing)
      if (pathname !== '/index.html') {
        filePath = path.join(ROOT_DIR, 'index.html');
        serveFile(filePath, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      }
    } else {
      serveFile(filePath, res);
    }
  });
});

// Start server
server.listen(PORT, 'localhost', () => {
  console.log(`
╔════════════════════════════════════════╗
║   📸 Photo Album Pro - Dev Server      ║
╚════════════════════════════════════════╝

Server running at: http://localhost:${PORT}

📍 Open your browser to:
   → http://localhost:${PORT}

Press Ctrl+C to stop the server
  `);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use`);
    console.error(`Try using a different port: node server.js 3001`);
    process.exit(1);
  } else {
    throw err;
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n\n👋 Server shutting down...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Server shutting down...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
