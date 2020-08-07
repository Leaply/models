import "https://deno.land/x/dotenv/load.ts";
import { ClientPostgreSQL } from "https://deno.land/x/nessie/mod.ts";

/** These are the default config options. */
const clientOptions = {
  migrationFolder: "./db/migrations",
  seedFolder: "./db/seeds",
};

export default {
  // PostgreSQL client
  client: new ClientPostgreSQL(clientOptions, {
    database: Deno.env.get('LEAPLY_DATABASE'),
    hostname: Deno.env.get('LEAPLY_DATABASE_HOST'),
    port: parseInt(Deno.env.get('LEAPLY_DATABASE_PORT') || "5432"),
    user: Deno.env.get('LEAPLY_DATABASE_USER'),
    password: Deno.env.get('LEAPLY_DATABASE_PASSWORD'),
  }),
  // Defaults to false, if you want the query builder exposed in migration files, set this to true.
  exposeQueryBuilder: false,
};
