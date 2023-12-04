import { isAxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../api/auth.api";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useLoginForm() {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<IApiStatus>("idle");
  const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const onSubmitLoginForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setStatus("loading");
      const { data } = await login(user.email, user.password);
      setStatus("succeeded");
      if (auth.onSetNewUser) {
        localStorage.setItem("token", data.data.token);
        auth.onSetNewUser(data.data.user);
        navigate("/");
      }
    } catch (error) {
      setStatus("failed");
      toast.error(
        isAxiosError(error) ? error.response?.data.message : "Error occured"
      );
    }
  };
  return {
    user,
    onSubmitLoginForm,
    loading: status === "loading",
    hasError: status === "failed",
    onChangeUser,
  };
}
