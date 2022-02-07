import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "wouter";

import App from "./App";
import { RoleProvider } from "./use/role";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <Router>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <RoleProvider>
            <App />
          </RoleProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  );
}
