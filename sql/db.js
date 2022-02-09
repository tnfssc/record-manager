/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { knex } = require("knex");
require("dotenv").config();

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
            rejectUnauthorized: false,
          }
        : false,
  },
});

module.exports = db;
