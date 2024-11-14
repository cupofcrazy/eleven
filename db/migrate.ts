import path from "path";
import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from "./client";

(async () => {
  console.log("Running migrations...");
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "db/migrations"),
  });
  console.log("Migrations complete!!!");
})();