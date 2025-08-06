// vite-plugin-mime-type.js
export default function mimeTypePlugin() {
  return {
    name: 'vite-plugin-mime-type',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Set correct MIME types for JavaScript files
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      });
    },
    generateBundle(options, bundle) {
      // Add .js extension to all JavaScript chunks
      Object.keys(bundle).forEach(fileName => {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && !fileName.endsWith('.js')) {
          bundle[`${fileName}.js`] = chunk;
          delete bundle[fileName];
        }
      });
    },
  };
}
