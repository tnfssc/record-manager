import { Box, CircularProgress, Heading, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Column } from "react-table";

import { ROLES } from "../../../constants/auth";
import { User } from "../../../constants/users";
import getAllUsers from "../../api/roles/getAll";
import ChakraTable from "../../components/ChakraTable";

const UsersPage: React.FC = () => {
  const { data, isLoading, error } = useQuery("allRoles", () => getAllUsers(), {
    retry: false,
  });
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
  if (isLoading) return <CircularProgress />;
  if (error || !data) return <Box>Error</Box>;
  return (
    <Box>
      <Heading>Users Page</Heading>
      <ChakraTable columns={columns} data={data} />
    </Box>
  );
};

export default UsersPage;
