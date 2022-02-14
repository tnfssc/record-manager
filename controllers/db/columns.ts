import { Columns } from "../../constants/main";
import db from ".";

const columnsTable = db<Columns>("columns");

export default columnsTable;
