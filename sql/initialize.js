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
    if (!(await db.schema.hasTable("columns"))) {
      console.log("Creating Columns table...");
      await db.schema.createTable("columns", (table) => {
        table.integer("student_id").unsigned().primary().notNullable();
        table.foreign("student_id").references("students.id");
        table.timestamp("date").defaultTo(db.fn.now());
        table.string("file_url_json").defaultTo(JSON.stringify([]));
        table.timestamp("created_at").defaultTo(db.fn.now());
      });
      console.log("Columns table created!");
    }
  } catch (error) {
    console.error(error);
  }
};

initialize();
