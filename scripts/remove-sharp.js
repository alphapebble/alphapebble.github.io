import fs from 'node:fs';
import path from 'node:path';

const roots = [
  '.next/standalone/node_modules',
  '.open-next/server-functions/default/node_modules',
];

const dirs = ['sharp', 'next/dist/compiled/sharp'];

for (const root of roots) {
  for (const d of dirs) {
    const p = path.join(root, ...d.split('/'));
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log('Removed', p);
    }
  }
}
