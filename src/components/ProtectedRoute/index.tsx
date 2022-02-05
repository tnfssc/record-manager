import { Redirect, Route, RouteProps } from "wouter";

import { useAuth } from "../../lib/firebase";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const [user, loading] = useAuth();
  if (loading) return null;

  if (!user) return <Redirect to="/" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
