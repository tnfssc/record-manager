import { Box, Heading, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column } from "react-table";

import { ROLES } from "../../../constants/auth";
import { User } from "../../../constants/users";
import ChakraTable from "../../components/ChakraTable";

const UsersPage: React.FC = () => {
  const changeRole = (email: string, role: ROLES) => {
    console.log(email, role);
  };
  const columns = useMemo<Column<User>[]>(
    () => [
      {
        Header: "Name",
        accessor: "displayName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({
          value,
          row: {
            original: { email },
          },
        }) => (
          <Select
            value={value}
            onChange={(e) => changeRole(email, e.target.value as ROLES)}
          >
            {Object.values(ROLES).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </Select>
        ),
      },
    ],
    [],
  );
  const data = useMemo<User[]>(
    () => [
      {
        displayName: "John Doe",
        email: "john.doe@example.com",
        role: ROLES.ADMIN,
      },
      {
        displayName: "Jane Doe",
        email: "jane.doe@example.com",
        role: ROLES.USER,
      },
    ],
    [],
  );
  return (
    <Box>
      <Heading>Users Page</Heading>
      <ChakraTable columns={columns} data={data} />
    </Box>
  );
};

export default UsersPage;
