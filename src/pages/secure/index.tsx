import { Box, chakra, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";

import getRole from "../../api/roles/get";

const SecurePage: React.FC = () => {
  const { data } = useQuery("data", getRole);

  return (
    <Box>
      <Heading>Secure Page</Heading>
      <chakra.p>
        Your access level is <chakra.span color="red">{data?.role}</chakra.span>
      </chakra.p>
      <chakra.p>{data?.email}</chakra.p>
    </Box>
  );
};

export default SecurePage;
