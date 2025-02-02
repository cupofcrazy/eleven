import { config } from "dotenv";

import type { Config } from "drizzle-kit";

config({
  path: ".env"
})

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
} satisfies Config;