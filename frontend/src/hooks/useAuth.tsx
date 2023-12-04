import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return {
    user: auth?.user || null,
    status: auth?.status || "loading",
    onSetNewUser: auth?.onSetUser,
  };
}
