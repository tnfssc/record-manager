import { Box, chakra, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

import getMain from "../../api/main/get";
import useRole from "../../use/role";

const SecurePage: React.FC = () => {
  const role = useRole();
  useEffect(() => {
    getMain().then((v) => console.log(v));
  }, []);
  return (
    <Box>
      <Heading>Secure Page</Heading>
      <chakra.p>
        Your access level is <chakra.span color="red">{role}</chakra.span>
      </chakra.p>
    </Box>
  );
};

export default SecurePage;
