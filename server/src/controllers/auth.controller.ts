import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import { craeteNewUser } from "../dal/user.dal";

export const googleCallBack = async (req: Request, res: Response) => {
  res.redirect("/");
};

export const localLoginCallBack = async (req: Request, res: Response) => {
  res.redirect("/");
};

export const registerUser = async (req: Request, res: Response) => {
  const { 
    userName,
    firstName,
    lastName,
    email,
    password
   } = req.body;

   // Add function to save image and create path
   let imageUrl = ""

  try {
    await craeteNewUser({
      userName,
      firstName,
      lastName,
      email
     },
    password,
    imageUrl
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
