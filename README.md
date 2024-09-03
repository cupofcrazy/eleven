# ELEVEN — Next.js 14 Project with Auth.js, Turso SQLite Database, Drizzle ORM

This is a customNext.js 14 project with authentication using NextAuth.js and a TURSO SQLite database managed by Drizzle ORM.

## Features

- Next.js 14 with App Router
- Authentication using NextAuth.js
- Google OAuth provider
- Turso SQLite database with Drizzle ORM
- Tailwind CSS for styling
- TypeScript for type safety

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   TURSO_DATABASE_URL=your_turso_database_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Management

This project uses Drizzle ORM with a SQLite database. To manage your database:

- Generate migrations: `npm run db:generate`
- Push schema changes: `npm run db:push`
- Open Drizzle Studio: `npm run db:studio`

## Project Structure

- `app/`: Next.js app router pages and API routes
- `components/`: React components
- `db/`: Database schema and configuration
- `migrations/`: Database migration files
- `styles/`: Global styles and Tailwind CSS configuration

