import { StatusCodes } from "../enums";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    (res.statusCode && res.statusCode) || StatusCodes.InternalSE;

  switch (statusCode) {
    case StatusCodes.NotFound:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case StatusCodes.Unauthorized:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case StatusCodes.BadRequest:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case StatusCodes.Forbidden:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case StatusCodes.Conflict:
      res.json({
        title: "Conflict",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "Server error",
        message: err.message,
        stackTrace: err.stack,
      });
  }
};

export { errorHandler };
