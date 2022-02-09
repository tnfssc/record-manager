import db from ".";

export interface Student {
  id: number;
  email: string;
  name: string;
  batch: string;
  created_at: Date;
}

const studentsTable = db<Student>("students");

export default studentsTable;
