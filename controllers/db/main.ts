import { Columns, Main } from "../../constants/main";
import db from ".";

export const getMainLabels = async (): Promise<Record<string, string>> =>
  (await db<Record<string, string>>("column-labels").select("*"))[0];

const getMain = async (limit = 10, offset = 0): Promise<Main[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...columnIndices } = (
    await db<{ id: number } & Record<string, number>>("column-order").select("*")
  )[0];

  /** contains numbers 1, 2, 3 etc (not 0,1,2,3 etc) mapped to 1, 2, 3 etc in some order */
  const columnOrder = [
    0,
    ...Object.keys(columnIndices).map((name) => columnIndices[name]),
  ];
  const res = await db<Main>("main")
    .select("*")
    .orderBy("email")
    .limit(limit)
    .offset(offset);
  const result: Main[] = res.map<Main>(
    ({ batch, created_at, email, id, name, ...columns }) => {
      const newColumns: Columns = {};
      columnOrder.forEach(
        (columnIndex, index) =>
          (newColumns[`column-${index}`] = columns[`column-${columnIndex}`]),
      );
      return {
        id,
        batch,
        created_at,
        email,
        name,
        ...newColumns,
      } as Main;
    },
  );
  return result;
};

export default getMain;
