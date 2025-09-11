/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/projects.html",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/blogs.html",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true, // disables next/image optimization (not supported on GH Pages)
  },
  output: "export", // enables static export
  basePath: "/alphapebble.github.io", // GitHub repo name
};

export default nextConfig;
