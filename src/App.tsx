import { Route } from "wouter";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages";
import SecurePage from "./pages/secure";

export default function App() {
  return (
    <Layout>
      <Route path="/">
        <HomePage />
      </Route>
      <ProtectedRoute path="/secure">
        <SecurePage />
      </ProtectedRoute>
    </Layout>
  );
}
