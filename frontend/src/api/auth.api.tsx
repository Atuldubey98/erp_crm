import apiInstance, { sanitizedObject } from "./api.instance";
enum EAuthAPI {
  LOGIN = "/api/v1/users/login",
  REGISTER = "/api/v1/users/register",
  CURRENT_USER = "/api/v1/users",
}
export const login = (email: string, password: string) => {
  return apiInstance.post(EAuthAPI.LOGIN, sanitizedObject({ email, password }));
};
export const register = (user: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  maidenName: string;
  phoneNumber: string;
}) => {
  return apiInstance.post(EAuthAPI.REGISTER, sanitizedObject(user));
};
export const currentUser = () => {
  return apiInstance.get(EAuthAPI.CURRENT_USER);
};
