import { Box, Heading } from "@chakra-ui/react";

import EditableTable from "../../components/EditableTable";

const UsersPage: React.FC = () => {
  return (
    <Box>
      <Heading>Users Page</Heading>
      <EditableTable />
    </Box>
  );
};

export default UsersPage;
