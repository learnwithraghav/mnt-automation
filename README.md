# MNT Automations

A Next.js application for the MNT automation project.

## Requirements

- Node.js (LTS recommended)
- npm

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the project's Next.js lint command |

Run `npm run build` before deploying to catch production build errors.

## Project structure

```text
src/
  app/
    api/
      ai-reply/   # AI reply API route
package.json      # Dependencies and npm scripts
```

The application uses Next.js 14, React 18, and TypeScript. Styling is configured with Tailwind CSS.

## Development notes

- Keep secrets and API keys out of source control.
- Add required environment variable names and setup instructions here when integrating external services.
- Update this README when scripts, routes, or setup requirements change.
