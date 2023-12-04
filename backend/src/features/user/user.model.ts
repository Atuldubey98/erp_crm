import { Schema, model } from "mongoose";
import * as argon2 from "argon2";
import { IUser, IUserMethods, UserModel } from "./types";
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        index: true,
        required: true
    },
    lastName: {
        type: String,
        maxLength: 30
    },
    maidenName: {
        type: String,
        maxLength: 30
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxLength: 30,
        minLength: 6,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    passwordSalt: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    phoneNumber: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false
})
userSchema.method('getFullName', function fullName() {
    return `${this.firstName} ${this.maidenName || ""} ${this.lastName || ""}`;
});
userSchema.method('validatePassword', async function validatePassword(password:string) {
    const isPasswordMatching = await argon2.verify(this.passwordSalt,password);
    return isPasswordMatching;
});
userSchema.pre("save", async function (next) {
    this.passwordSalt = await argon2.hash(this.passwordSalt);
    next();
})
const User = model("user", userSchema);

export default User;