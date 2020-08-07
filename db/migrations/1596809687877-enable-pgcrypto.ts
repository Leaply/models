import { Migration } from "https://deno.land/x/nessie/mod.ts";

export const up: Migration = () => {
  return "CREATE EXTENSION IF NOT EXISTS pgcrypto;";
};

export const down: Migration = () => {
  return "DROP EXTENSION IF EXISTS pgcrypto";
};
