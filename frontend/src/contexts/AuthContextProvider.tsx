import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { currentUser } from "../api/auth.api";

export default function AuthContextProvider({
  children,
}: {
  children: React.JSX.Element;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<IApiStatus>("loading");
  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const { data } = await currentUser();
        setUser(data.data);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    })();
  }, []);
  function onSetUser(currentUser: IUser | null) {
    setUser(currentUser);
  }
  return (
    <AuthContext.Provider value={{ user, onSetUser, status }}>
      {children}
    </AuthContext.Provider>
  );
}
