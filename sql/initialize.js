/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const db = require("./db");

const initialize = async () => {
  try {
    if (!(await db.schema.hasTable("students"))) {
      console.log("Creating students table...");
      await db.schema.createTable("students", (table) => {
        table.increments("id").primary();
        table.string("email").unique();
        table.string("name");
        table.string("batch");
        table.timestamp("created_at").defaultTo(db.fn.now());
      });
      console.log("Students table created!");
    }
  } catch (error) {
    console.error(error);
  }
};

initialize();
