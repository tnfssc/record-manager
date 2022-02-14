import db from ".";
import { Columns } from "./columns";
import { Student } from "./students";

export type Main = Student & { columns: Omit<Columns, "created_at">[] };

/**@todo Fix limit issue */
// const getMain = async (limit = 10, offset = 0): Promise<Main[]> =>
//   await db<Student>("students")
//     .orderBy("name")
//     .limit(limit)
//     .leftOuterJoin<Columns>("columns", "students.id", "=", "columns.student_id")
//     .offset(offset)
//     .orderBy("date")
//     .select("*")
//     .then((values) => {
//       const result: Main[] = [];
//       values.forEach(({ email, name, batch, id, created_at, ...value }) => {
//         if (result.find((e) => e.id === id)) {
//           result.find((e) => e.id === id).columns.push({ ...value });
//         } else
//           result.push({
//             email,
//             name,
//             batch,
//             id,
//             created_at,
//             columns: [{ ...value }],
//           });
//       });
//       return result;
//     });
const getMain = async (limit = 10, offset = 0): Promise<Main[]> =>
  await db<Student>("students")
    .with("students_list", (students_list) =>
      students_list
        .from<Student>("students")
        .select("*")
        .limit(limit)
        .offset(offset)
        .orderBy("email"),
    )
    .from<Student>("students_list")
    .select("*")
    .leftOuterJoin<Columns>("columns", "students_list.id", "=", "columns.student_id")
    .orderBy("date")
    .select("*")
    .then((values) => {
      const result: Main[] = [];
      values.forEach(({ email, name, batch, id, created_at, ...value }) => {
        if (result.find((e) => e.id === id)) {
          result.find((e) => e.id === id).columns.push({ ...value });
        } else
          result.push({
            email,
            name,
            batch,
            id,
            created_at,
            columns: [{ ...value }],
          });
      });
      return result;
    });
export default getMain;
