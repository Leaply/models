# Leaply Models

Shared models and database configuration for the Leaply platform

## Overview

This is a collection of types (in the TypeScript sense) to be imported by
various applications on the Leaply platform. It also contains tools to manage
and maintain the shared database. This ensures that any changes required are
reviewed and applied in a controlled manner.

```
NOTE: This repository is "Work In Progress" and not currently in use on the 
Leaply platform. It is not considered production-ready. It is a part of an 
effort to migrate the current platform to a Open Source (OSS) Service Oriented
Architecture (SOA).
```

## Purpose

The Leaply platform is split into multiple applications providing focused 
services. To maintain referential integrity and simplify analytics data is 
stored in a shared database. There are occasions where data from one service is
needed in another services.

In these cases one service would be considered as *owner* of that data so it
could be responsible for database migrations, but other services would still 
need the types creating duplication that will eventually lead to inconsistency.

Another problem is generating seeds across services. Requiring developers to 
run specific seeds from separate services in the correct order is problematic.
For referential integrity atomic transactions containing all the relevant data
is ideal (even though services should be structured so that events can occur
some time apart and still acceptable representation in the database).

## Components

- Deno
- Nessie
- PostgreSQL 12
  - pgcrypto (for UUID support)


## Usage

To get started first create a database like so:

```SQL
CREATE DATABASE leaply_development
    WITH 
    OWNER = exastencil
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
```

where `leaply_development` is ``leaply_${environment}`` and `exastencil` is the
database user (typically `$(whoami)`).

Set your database credentials in `.env`. See `.env.example` and specify 
anything that doesn't match `.env.defaults`, typically the user and password.

### Generate a migration

```bash
deno run --allow-env --allow-net --allow-read --allow-write https://deno.land/x/nessie/cli.ts make name-of-migration
```

### Generate a seed file

```bash
deno run --allow-env --allow-net --allow-read --allow-write https://deno.land/x/nessie/cli.ts make:seed name-of-seed
```

### Run migrations

```bash
deno run --allow-env --allow-net --allow-read --allow-write https://deno.land/x/nessie/cli.ts migrate
```

### Rollback migrations

```bash
deno run --allow-env --allow-net --allow-read --allow-write https://deno.land/x/nessie/cli.ts rollback
```

### Seed the database

```bash
deno run --allow-env --allow-net --allow-read --allow-write https://deno.land/x/nessie/cli.ts seed
```

## Maintainer

- Michael Prins (Leaply)