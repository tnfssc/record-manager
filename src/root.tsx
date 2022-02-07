import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "wouter";

import App from "./App";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <Router>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Router>
  );
}
