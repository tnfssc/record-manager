import db from ".";

export interface Student {
  id: number;
  email: string;
  name: string;
  batch: string;
  /** timestampz */
  created_at: string;
}

const studentsTable = db<Student>("students");

export default studentsTable;
