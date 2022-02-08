import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Column, Row } from "react-table";

type _String<T> =
  | string
  | Extract<keyof T, string>
  | (undefined & Extract<keyof T, string>)
  | (string & Extract<keyof T, string>)
  | (Extract<keyof T, string> & string)
  | undefined;

export type OnUpdate<T> = (index: number, id: _String<T>, value: string) => void;

export interface EditableCellProps<T extends object> {
  value: string;
  row: Row<T>;
  column: Column<T>;
  onUpdate: OnUpdate<T>;
}

const EditableCell = <T extends object>({
  value: initialValue,
  row: { index },
  column: { id },
  onUpdate,
}: EditableCellProps<T>) => {
  const [value, setValue] = useState(initialValue);
  const onBlur = () => onUpdate(index, id, value);
  useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Input value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
  );
};

export default EditableCell;
