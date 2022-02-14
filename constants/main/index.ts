export type Main = Student & { columns: Omit<Columns, "created_at">[] };

export interface Columns {
  /** foreign key students.id */
  student_id: number;
  /** timestampz */
  date: string;
  /** stringified JSON - `Array<string>` */
  file_urls: string;
  /** stringified JSON - `never` */
  meta: string;
  /** timestampz */
  created_at: string;
}

export interface Student {
  id: number;
  email: string;
  name: string;
  batch: string;
  /** timestampz */
  created_at: string;
}
