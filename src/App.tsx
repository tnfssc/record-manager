import { Route } from "wouter";

import { ROLES } from "../constants/auth";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages";
import MainPage from "./pages/main";
import SecurePage from "./pages/secure";
import UsersPage from "./pages/users";

export default function App() {
  return (
    <Layout>
      <Route path="/">
        <HomePage />
      </Route>
      <ProtectedRoute accessRole={[ROLES.USER, ROLES.ADMIN]} path="/secure">
        <SecurePage />
      </ProtectedRoute>
      <ProtectedRoute accessRole={[ROLES.ADMIN]} path="/users">
        <UsersPage />
      </ProtectedRoute>
      <ProtectedRoute accessRole={[ROLES.ADMIN]} path="/main">
        <MainPage />
      </ProtectedRoute>
    </Layout>
  );
}
