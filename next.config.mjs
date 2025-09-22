import createMDX from "@next/mdx";
import { directives } from "./csp.config.js";

const withMDX = createMDX({ extension: /\.mdx?$/ });

function buildCSP(directives) {
  return Object.entries(directives)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ");
}

const csp = buildCSP(directives);

const nextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
