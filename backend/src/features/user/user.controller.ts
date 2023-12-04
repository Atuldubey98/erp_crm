import { NextFunction, Request, Response } from "express";
import { createUser, findUserByEmail } from "./user.repository";
import { loginUserValidation, registerUserValidation } from "./user.request";
import { LoginBody } from "./types";
import { PasswordNotMatching, UserNotFound } from "./errors";
import { getJwtToken } from "../../services/jwt.service";
import requestAsyncHandler from "../../middlewares/requestAsyncHandler";

export const register = requestAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userBody = await registerUserValidation.validateAsync(req.body);
    const { password: passwordSalt, ...restUser } = userBody;
    const newUser = await createUser({ ...restUser, passwordSalt });
    return res.status(201).send({
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  }
);
export const login = requestAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginBody: LoginBody = await loginUserValidation.validateAsync(
      req.body
    );
    const existingUser = await findUserByEmail(loginBody.email);
    if (!existingUser) {
      throw new UserNotFound();
    }
    const isPasswordMatching = await existingUser.validatePassword(
      loginBody.password
    );
    if (!isPasswordMatching) {
      throw new PasswordNotMatching();
    }
    const user = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      _id: existingUser._id,
      role: existingUser.role,
    };
    const token = getJwtToken(user);
    return res.status(200).json({
      status: true,
      data: { user, token },
    });
  }
);
export function currentUser(req: Request, res: Response) {
  //@ts-ignore
  return res.status(200).json({ status: true, data: req.user });
}
