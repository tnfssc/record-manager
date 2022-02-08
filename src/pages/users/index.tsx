import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Select,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Column } from "react-table";

import { ROLES } from "../../../constants/auth";
import { User } from "../../../constants/users";
import updateRoles from "../../api/roles/change";
import getAllUsers from "../../api/roles/getAll";
import ChakraTable from "../../components/ChakraTable";

const UsersPage: React.FC = () => {
  const toast = useToast({ position: "bottom-left" });
  const [isLoading, setIsLoading] = useBoolean(false);
  const {
    data: originalData,
    error,
    isFetching,
  } = useQuery("allRoles", () => getAllUsers(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  const [changes, setChanges] = useState<Omit<User, "displayName">[]>([]);
  const data = useMemo(() => {
    if (!originalData) return [];
    const result = originalData.map((user) => ({ ...user }));
    changes.forEach((change) => {
      const index = result.findIndex((u) => u.email === change.email);
      if (index !== -1) {
        result[index].role = change.role;
      }
    });
    return result;
  }, [changes, originalData]);

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
  const changeRole = (email: string, role: ROLES) => {
    setChanges((prev) => {
      const index = prev.findIndex((c) => c.email === email);
      if (index !== -1) {
        prev[index].email = email;
      }
      return [...prev, { email, role }];
    });
  };
  const saveChanges = async () => {
    setIsLoading.on();
    try {
      toast({ title: "Saving...", status: "info" });
      await updateRoles(changes);
      toast({ title: "Saved", status: "success" });
      queryClient.invalidateQueries("allRoles");
      setChanges([]);
    } catch (error) {
      toast({ title: "Error", status: "error" });
      console.error(error);
    }
    setIsLoading.off();
  };
  if (isFetching) return <CircularProgress />;
  if (error) return <Box>Error</Box>;
  return (
    <Box>
      <Heading>Users Page</Heading>
      <ChakraTable columns={columns} data={data} />
      <Button colorScheme="linkedin" w="full" onClick={saveChanges} isLoading={isLoading}>
        Save
      </Button>
    </Box>
  );
};

export default UsersPage;
