import { ApiError } from "../../handlers/errors";

export class UserNotFound extends ApiError {
    constructor() {
        super();
        this.code = 400;
        this.message = "User not found";
        this.name = "UserNotFound";
    }
}

export class PasswordNotMatching extends ApiError {
    constructor() {
        super();
        this.code = 400;
        this.message = "Password does not match";
        this.name = "PasswordNotMatching";
    }
}