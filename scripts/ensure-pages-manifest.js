// scripts/ensure-pages-manifest.js
const fs = require('fs');
const path = require('path');

// Where OpenNext looks (standalone build path)
const target = path.join('.next', 'standalone', '.next', 'server', 'pages-manifest.json');
// Fallback location (sometimes Next still writes here)
const alt = path.join('.next', 'server', 'pages-manifest.json');

fs.mkdirSync(path.dirname(target), { recursive: true });

let data = '{}';
if (fs.existsSync(alt)) {
  data = fs.readFileSync(alt, 'utf8');
}

if (!fs.existsSync(target)) {
  fs.writeFileSync(target, data);
  console.log('Created', target, 'with', alt && fs.existsSync(alt) ? 'copy from alt' : 'empty {}');
} else {
  console.log('pages-manifest already present at', target);
}
