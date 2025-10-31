import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.slate.200"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-links": theme("colors.indigo.400"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-hr": theme("colors.white/10"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
