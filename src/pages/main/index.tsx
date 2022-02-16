import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { Column } from "react-table";

import { Main } from "../../../constants/main";
import getMain from "../../api/main/get";
import ChakraTable from "../../components/ChakraTable";

const MainPage: React.FC = () => {
  const data = useMemo(() => [], []);
  const columns = useMemo<Column<Main>[]>(() => {
    getMain();
    return [];
  }, []);
  return (
    <Box>
      <ChakraTable columns={columns} data={data} />
    </Box>
  );
};

export default MainPage;
