# MNT Automations

A Next.js application for the MNT automation project.

## Requirements

- Node.js (LTS recommended)
- npm

## Getting started

1. Copy `.env.example` to `.env.local` and fill in the required values.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

- `OPENROUTER_API_KEY`: OpenRouter API key used by the AI reply endpoint. The endpoint also accepts the legacy `OPENAI_API_KEY` variable.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Google OAuth credentials for NextAuth sign-in.
- `NEXTAUTH_URL`: Application URL (use `http://localhost:3000` locally).
- `NEXTAUTH_SECRET`: Random secret used to sign/encrypt NextAuth tokens. Generate one with `openssl rand -base64 32`.

For Google OAuth, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in Google Cloud Console. Add the matching callback URL for your deployed application too.

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
      auth/[...nextauth]/  # Google OAuth / NextAuth handler
      ai-reply/            # AI reply API route
package.json               # Dependencies and npm scripts
```

The application uses Next.js 14, React 18, and TypeScript. Styling is configured with Tailwind CSS.

## Development notes

- Keep secrets and API keys out of source control.
- Add required environment variable names and setup instructions here when integrating external services.
- Update this README when scripts, routes, or setup requirements change.
