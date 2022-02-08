import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column, useTable } from "react-table";

import EditableCell, { EditableCellProps, OnUpdate } from "./EditableCell";

const ChakraTable = <T extends object>({
  columns,
  data,
  isEditable = false,
  onUpdate,
}: {
  columns: Column<T>[];
  data: T[];
  isEditable?: boolean;
  onUpdate?: OnUpdate<T>;
}) => {
  const defaultColumn = useMemo(
    () =>
      isEditable && onUpdate
        ? {
            Cell: (props: Omit<EditableCellProps<T>, "onUpdate">) => (
              <EditableCell {...props} onUpdate={onUpdate} />
            ),
          }
        : undefined,
    [isEditable, onUpdate],
  );
  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
  });
  return (
    <Box overflow="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...columnProps } = column.getHeaderProps();
                  return (
                    <Th key={key} {...columnProps}>
                      {column.render("Header")}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              <Tr key={key} {...rowProps}>
                {row.cells.map((cell) => {
                  const { key, ...cellProps } = cell.getCellProps();
                  return (
                    <Td key={key} {...cellProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ChakraTable;
