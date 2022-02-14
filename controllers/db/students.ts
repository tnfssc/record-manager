import { Student } from "../../constants/main";
import db from ".";

const studentsTable = db<Student>("students");

export default studentsTable;
