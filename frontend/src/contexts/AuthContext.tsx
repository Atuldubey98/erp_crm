import { createContext } from "react";

type AuthContextProps = {
  user: IUser | null;
  onSetUser(currentUser: IUser | null): void;
  status: IApiStatus;
};
const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
