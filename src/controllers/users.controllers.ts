/**
 * User controllers with class
 */

import { Request, Response, NextFunction } from "express";
import { Users } from "../db/models";
import { StatusCodes } from "../enums";
import { crypt, auth } from "../helpers";

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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        res.status(StatusCodes.BadRequest);
        throw new Error("Email and password is mandatory");
      }

      const user = await Users.findOne({ email });
      if (user && (await crypt.compare(password, user.password || ""))) {
        const accessToken = await auth
          .signAccessToken({
            _id: `${user._id}`,
            username: user.username || "",
            email: user.email || "",
          })
          .catch((error) => new Error(error));

        res.status(StatusCodes.OK).json({ accessToken });
      } else {
        res.status(StatusCodes.Unauthorized);
        throw new Error("email or password is not matching");
      }
    } catch (error) {
      next(error);
    }
  };

  current = (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(StatusCodes.OK).json(user);
  };
}

export default UserControllers;
