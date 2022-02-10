import db from ".";

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

const columnsTable = db<Columns>("columns");

export default columnsTable;
