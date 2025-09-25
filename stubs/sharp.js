// minimal stub so any accidental import won't crash the Worker
module.exports = new Proxy({}, {
  get() {
    throw new Error('sharp is disabled in Cloudflare Workers');
  }
});
