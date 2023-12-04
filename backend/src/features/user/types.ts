import { Model } from "mongoose";
export interface LoginBody {
    email: string;
    password: string;
}
type Role = "admin" | "user";

export interface IUser {
    firstName: string;
    lastName: string;
    maidenName: string;
    email: string;
    passwordSalt: string;
    role: Role,
    phoneNumber: string;
}
export interface UserPayload {
    [key: string]: any;
}
export interface IUserMethods {
    getFullName: () => string;
    validatePassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;