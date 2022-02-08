import { Redirect, Route, RouteProps } from "wouter";

import { ROLES } from "../../../constants/auth";
import { useAuth } from "../../lib/firebase";
import useRole from "../../use/role";

const ProtectedRoute: React.FC<RouteProps & { accessRole: ROLES[] }> = ({
  accessRole: requiredRoles,
  ...props
}) => {
  const [user, loading] = useAuth();
  const userRole = useRole();
  if (loading || userRole === undefined) return null;
  if (!user || !userRole) return <Redirect to="/" />;
  if (!requiredRoles.includes(userRole)) return <Redirect to="/" />;
  return <Route {...props} />;
};

export default ProtectedRoute;
