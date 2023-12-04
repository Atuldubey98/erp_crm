import { ApiError } from "../handlers/errors";

export class UnAuthenticatedError extends ApiError {
  constructor() {
    super();
    this.code = 401;
    this.message = "unauthenticated request";
    this.name = "UnAuthenticatedError";
  }
}

export class UnAuthorizedError extends ApiError {
  constructor() {
    super();
    this.code = 403;
    this.message = "unauthorized request";
    this.name = "UnAuthorizedError";
  }
}
