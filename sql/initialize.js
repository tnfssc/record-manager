/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// @ts-check

const db = require("./db");

const initialize = async () => {
  try {
    if (!(await db.schema.hasTable("main"))) {
      console.log("Creating main table...");
      const defaultColumn = JSON.stringify({
        date: null,
        file_urls: [],
        notes: null,
        meta: {},
      });
      await db.schema.createTable("main", (table) => {
        table.uuid("id").primary().defaultTo(db.raw("(uuid_generate_v4())"));
        table.string("email").notNullable().unique();
        table.string("name");
        table.string("batch");
        table.json("column-1").defaultTo(defaultColumn);
        table.json("column-2").defaultTo(defaultColumn);
        table.json("column-3").defaultTo(defaultColumn);
        table.timestamp("created_at", { useTz: true }).defaultTo(db.fn.now());
      });
      console.log("Main table created!");
    }
    if (!(await db.schema.hasTable("column-order"))) {
      console.log("Creating column-order table...");
      await db.schema.createTable("column-order", (table) => {
        table.increments("id").primary().notNullable();
        table.integer("column-1").defaultTo(1);
        table.integer("column-2").defaultTo(2);
        table.integer("column-3").defaultTo(3);
      });
      await db.from("column-order").insert({});
      console.log("Column-order table created!");
    }
    if (!(await db.schema.hasTable("column-labels"))) {
      console.log("Creating column-labels table...");
      await db.schema.createTable("column-labels", (table) => {
        table.increments("id").primary().notNullable();
        table.string("column-1").defaultTo("Column 1");
        table.string("column-2").defaultTo("Column 2");
        table.string("column-3").defaultTo("Column 3");
      });
      await db.from("column-labels").insert({});
      console.log("Column-labels table created!");
    }
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initialize();
