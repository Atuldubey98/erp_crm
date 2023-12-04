import { ChangeEvent, useState } from "react";

export default function useUserRegisterForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    maidenName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const onChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const numberOnlyRegex = /^[0-9\b]+$/;
    if (name === "phoneNumber") {
      if (value && !numberOnlyRegex.test(value)) {
        return;
      }
    }
    setUser({
      ...user,
      [name]: value,
    });
  };
  return { onChangeUser, user };
}
