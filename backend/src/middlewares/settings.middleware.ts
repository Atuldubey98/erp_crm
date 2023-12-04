import { NextFunction, Request, Response } from "express";
import { getSettings } from "../features/settings/settings.repository";
import { UnAuthorizedError } from "./errors";
import requestAsyncHandler from "./requestAsyncHandler";

export const settingsAuthenticationMiddleware = requestAsyncHandler(
  async (req: Request, __: Response, next: NextFunction) => {
    const { company, invoice, quote, admin } = await getSettings();
    if (!company || !invoice || !quote || !admin) {
      next();
      return;
    }
    if (req.method === "GET") {
      next();
      return;
    }
    throw new UnAuthorizedError();
  }
);
