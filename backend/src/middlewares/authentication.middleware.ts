import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "./errors";
import { getUserPayloadFromToken } from "../services/jwt.service";

export default function authenticationMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const userPayload = getUserPayload(req);
    //@ts-ignore
    req.user = userPayload;
    next();
  } catch (error) {
    next(error);
  }
}

export function getUserPayload(req: Request) {
  const { authorization = "" } = req.headers;
  if (
    !authorization ||
    authorization.split(" ").length !== 2 ||
    authorization.split(" ")[0] !== "Bearer"
  ) {
    throw new UnAuthenticatedError();
  }
  const userPayload = getUserPayloadFromToken(authorization.split(" ")[1]);

  return userPayload;
}
