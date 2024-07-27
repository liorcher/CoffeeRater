import { Router, Request, Response, NextFunction } from "express";
import { craeteNewUser } from "../dal/user.dal";
import jwt from 'jsonwebtoken';


export const googleCallBack = async (req: Request, res: Response) => {
  const user = req.user;
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, { httpOnly: true, secure: true });
  res.redirect("/");
};

export const localLoginCallBack = async (req: Request, res: Response) => {
  const user = req.user;
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, { httpOnly: true, secure: true });
  res.redirect("/");
};

export const registerUser = async (req: Request, res: Response) => {
  const { userName, firstName, lastName, email, password } = req.body;

  // Add function to save image and create path
  let imageUrl = "";

  try {
    await craeteNewUser(
      {
        userName,
        firstName,
        lastName,
        email,
      },
      imageUrl,
      password
    );

    res.redirect("/api/v1/auth/login");
  } catch (err) {
    res.status(500).send("Error registering new user.");
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
