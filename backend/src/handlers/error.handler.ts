import { NextFunction, Request, Response } from "express";
import { ApiError } from "./errors";
import { NODE_ENV } from "../config";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  let message = err.message || "Internel server error";
  let code = err.code || 500;
  if (err.name === "ValidationError") {
    code = 400;
    message = err.message;
  }
  if (err.name === "MongoServerError") {
    console.log(err.message);

    code = 400;
    switch (err.code) {
      case 11000:
        message = "Already exists";
        break;
      case 121:
      case 172:
        message = "Validation error";
        break;
      default:
        message = "Mongoose error";
        break;
    }
  }
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
    message = "unauthenticated request";
    code = 401;
  }
  if (NODE_ENV === "development") {
    console.log(err);
  }

  return res
    .status(code > 500 ? 500 : code)
    .json({ status: false, message, url: req.originalUrl, method: req.method });
};
export { errorHandler };
