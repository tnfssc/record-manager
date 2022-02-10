/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// @ts-check

const db = require("./db");

const initialize = async () => {
  try {
    if (!(await db.schema.hasTable("students"))) {
      console.log("Creating students table...");
      await db.schema.createTable("students", (table) => {
        table.increments("id").primary().notNullable();
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
        table.integer("student_id").unsigned().notNullable();
        table.foreign("student_id").references("students.id");
        table.timestamp("date").defaultTo(db.fn.now());
        table.json("file_urls").defaultTo(JSON.stringify([]));
        table.json("meta").defaultTo(JSON.stringify({}));
        table.timestamp("created_at").defaultTo(db.fn.now());
      });
      console.log("Columns table created!");
    }
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initialize();
