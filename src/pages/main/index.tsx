import { Box, CircularProgress } from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Column } from "react-table";

import { Main } from "../../../constants/main";
import getMain from "../../api/main/get";
import getMainLabels from "../../api/main/labels";
import ChakraTable from "../../components/ChakraTable";

const MainPage: React.FC = () => {
  const { data, error, isFetching } = useQuery(
    "main",
    async () => {
      const [data, labels] = await Promise.all([getMain(), getMainLabels()]);
      return { data, labels };
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
  const columns = useMemo<Column<Main>[]>(() => {
    const cols: Column<Main>[] = [
      {
        Header: "Name",
        accessor: (row) => row.name,
      },
      {
        Header: "Email",
        accessor: (row) => row.email,
      },
      {
        Header: "Batch",
        accessor: (row) => row.batch,
      },
    ];
    if (data && data.data.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { batch, created_at, email, id, name, ...rest } = data.data[0];
      Object.keys(rest).forEach((key) => {
        cols.push({
          Header: data.labels[key],
          accessor: (row) => row[key].notes,
        });
      });
    }
    return cols;
  }, [data]);
  if (isFetching) return <CircularProgress isIndeterminate />;
  if (!data || error) return <Box>Error</Box>;
  return (
    <Box>
      <ChakraTable columns={columns} data={data.data} />
    </Box>
  );
};

export default MainPage;
