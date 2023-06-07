/**
 * User controllers with class
 */

import { Request, Response, NextFunction } from "express";
import { Users } from "../db/models";
import { StatusCodes } from "../enums";
import { crypt } from "../helpers";

class UserControllers {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body || {};
      if (!username || !email || !password) {
        res.status(StatusCodes.BadRequest);
        throw new Error("All fields are mandatory");
      }
      const foundUser = await Users.findOne({ email });
      if (foundUser) {
        res.status(StatusCodes.Conflict);
        throw new Error("User already registered with this email");
      }
      const hashedPassword = await crypt.hash(password);

      const registered = await Users.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(StatusCodes.Created).json(registered);
    } catch (error) {
      next(error);
    }
  };
}

export default UserControllers;
