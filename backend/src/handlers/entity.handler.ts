import { NextFunction, Request, Response } from "express";
import requestAsyncHandler from "../middlewares/requestAsyncHandler";

export const createEntityHandler = requestAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.body = { ...req.body, createdBy: req.user._id };
    next();
  }
);

export const updateEntityHandler = requestAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.body = { ...req.body, updatedBy: req.user._id };
    next();
  }
);

export const paginateEntityHandler = requestAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit =
      typeof req.query.limit === "string" ? parseInt(req.query.limit) : "10";
    const skip =
      typeof req.query.skip === "string" ? parseInt(req.query.skip) : "0";
    const select = req.query.select || "";
    const filter = req.query.q ? { $text: { $search: req.query.q } } : {};
    req.query = {
      ...req.query,
      limit: String(limit),
      select,
      skip: String(skip),
      filter,
    };
    next();
  }
);
