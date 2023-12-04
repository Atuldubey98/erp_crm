import { Request, Response } from "express";

export default function notFoundHandler(
  req: Request,
  res: Response,
) {
  const routeTryingToVisitInfo = {
    method: req.method,
    url: req.originalUrl,
    message: "Route not found on the server",
  };
  return res.status(404).json({ status: false, data: routeTryingToVisitInfo });
}
