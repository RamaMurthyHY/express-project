import { Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { StatusCodes } from "../enums";
import { iTokenPayload } from "../types";

export const auth = {
  signAccessToken: (user: iTokenPayload) => {
    const ACCESS_TOKEN_SECRETE =
      process.env.ACCESS_TOKEN_SECRETE || "authSecrete";
    const TOKEN_EXPIRE_TIME = "15m";
    return new Promise((resolve, reject) => {
      const payload = { user };
      const secret = ACCESS_TOKEN_SECRETE;
      const options = {
        expiresIn: TOKEN_EXPIRE_TIME,
        issuer: "",
        audience: user._id,
      };
      JWT.sign(payload, secret, options, (error, response) => {
        if (error) reject(new Error("Internal Server Error"));
        resolve(response);
      });
    });
  },
  verifyAccessToken: (req: any, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization || req.headers.Authorization;
    const ACCESS_TOKEN_SECRETE =
      process.env.ACCESS_TOKEN_SECRETE || "authSecrete";
    if (!authToken) {
      res.status(StatusCodes.Unauthorized);
      throw new Error("Unauthorized");
    }
    let token = "";
    if (!Array.isArray(authToken) && authToken.startsWith("Bearer")) {
      token = authToken.split(" ")[1];
    }

    JWT.verify(token, ACCESS_TOKEN_SECRETE, (error: any, payload: any) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          res.status(StatusCodes.Unauthorized);
          throw new Error("Unauthorized");
        }
      }
      req.user = payload.user;
      next();
    });
  },
};
