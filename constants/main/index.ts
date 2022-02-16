// export type Main = Student & { columns: Omit<Columns, "created_at" | "id">[] };

export interface Student {
  id: string;
  email: string;
  name: string;
  batch: string;
  created_at: string;
}

export interface Cell {
  date: string | null;
  file_urls: Array<string>;
  notes: string | null;
  meta: unknown;
}

/** contains `column-1, column-2, column-3... etc` */
export type Columns = Record<string, Cell>;

/** contains `column-1, column-2, column-3... etc` */
export type Main = Student & Columns;
