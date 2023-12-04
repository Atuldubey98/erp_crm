import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.JSX.Element;
}) {
  const { status, user } = useAuth();
  const location = useLocation();
  if (status === "loading") {
    return <h1>user loading..</h1>;
  }
  if (user) {
    return children;
  }
  if (status === "failed") {
    return <Navigate to={"/auth"} state={{ from: location }} replace />;
  }
  return null;
}
