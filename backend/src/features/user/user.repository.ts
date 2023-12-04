import { IUser } from "./types";
import User from "./user.model";
import { registerUserValidation } from "./user.request";

export function createUser(userBody: IUser) {
  const user = new User(userBody);
  return user.save();
}

export function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function registerUser(user: IUser) {
  const userBody = await registerUserValidation.validateAsync(user);
  const { password: passwordSalt, ...restUser } = userBody;
  const newUser = await createUser({ ...restUser, passwordSalt });
  return newUser;
}
