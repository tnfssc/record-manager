import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "wouter";

import App from "./App";

export default function Root() {
  return (
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  );
}
