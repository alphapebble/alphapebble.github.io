# AlphaPebble Website

This is the official website for AlphaPebble, built with Next.js 15 and deployed to Cloudflare Pages via [OpenNext](https://opennext.js.org).

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 15
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com)
- **Adapter:** [OpenNext](https://opennext.js.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Linting:** [ESLint](https://eslint.org)
- **Formatting:** [Prettier](https://prettier.io)
- **Performance:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Development

This project runs on Cloudflare's `wrangler` CLI for local development to perfectly emulate the production environment.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the local development server:**
    ```bash
    npm run dev
    ```
    This command first runs the OpenNext build and then starts `wrangler dev` to serve the application locally (usually on `http://localhost:8787`).

## Key Scripts

- `npm run dev`: Starts the local Wrangler development server.
- `npm run build`: Creates a production-ready OpenNext build for Cloudflare.
- `npm run deploy`: Deploys the build to your Cloudflare production environment.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run format`: Formats all files using Prettier.
- `npm run lighthouse`: Runs a Lighthouse CI performance audit.
