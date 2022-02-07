import { Box, chakra, Heading } from "@chakra-ui/react";

import useRole from "../../use/role";

const SecurePage: React.FC = () => {
  const role = useRole();

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
