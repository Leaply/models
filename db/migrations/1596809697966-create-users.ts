import { Migration } from "https://deno.land/x/nessie/mod.ts";

export const up: Migration = () => {
  const createUsers = [
    "CREATE TABLE users",
    "(",
    "id uuid NOT NULL DEFAULT gen_random_uuid(),",
    "email character varying NOT NULL DEFAULT ''::character varying,",
    "encrypted_password character varying NOT NULL DEFAULT ''::character varying,",
    "reset_password_token character varying,",
    "reset_password_sent_at timestamp without time zone,",
    "remember_created_at timestamp without time zone,",
    "confirmation_token character varying,",
    "confirmed_at timestamp without time zone,",
    "confirmation_sent_at timestamp without time zone,",
    "unconfirmed_email character varying,",
    "locked_at timestamp without time zone,",
    "created_at timestamp(6) without time zone NOT NULL,",
    "updated_at timestamp(6) without time zone NOT NULL,",
    "CONSTRAINT users_pkey PRIMARY KEY (id)",
    ");",
  ].join("\n");

  const indexUsersOnUniqueEmail = [
    "CREATE UNIQUE INDEX index_users_on_email",
    "ON users USING btree",
    "(email ASC NULLS LAST);",
  ].join(" ");

  const indexUsersOnUniqueConfirmationToken = [
    "CREATE UNIQUE INDEX index_users_on_confirmation_token",
    "ON users USING btree",
    "(confirmation_token ASC NULLS LAST);",
  ].join(" ");

  const indexUsersOnUniqueResetPasswordToken = [
    "CREATE UNIQUE INDEX index_users_on_reset_password_token",
    "ON users USING btree",
    "(reset_password_token ASC NULLS LAST);",
  ].join(" ");

  return [
    createUsers,
    indexUsersOnUniqueEmail,
    indexUsersOnUniqueConfirmationToken,
    indexUsersOnUniqueResetPasswordToken,
  ];
};

export const down: Migration = () => {
  return "DROP TABLE users";
};
