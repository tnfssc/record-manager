import { knex } from "knex";
// import path from "node:path";

const db = knex({
  client: "pg",
  connection: {
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_ENDPOINT,
    port: Number(process.env.POSTGRES_PORT),
    ssl:
      process.env.POSTGRES_SSL === "true"
        ? {
            // capath: path.join(process.cwd(), "root.crt"),
            rejectUnauthorized: false,
          }
        : false,
  },
});

export default db;
