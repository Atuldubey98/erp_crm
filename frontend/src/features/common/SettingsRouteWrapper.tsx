import { Navigate } from "react-router-dom";
import useSettings from "../../hooks/useSettings";

export default function SettingsRouteWrapper({
  children,
}: {
  children: React.JSX.Element;
}) {
  const { status } = useSettings();
  if (status === "loading") {
    return <h1>Loading....</h1>;
  }
  if (status === "failed") {
    return <Navigate to={"/auth"} />;
  }
  return children;
}
