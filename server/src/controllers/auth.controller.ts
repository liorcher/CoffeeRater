import { Request, Response, NextFunction } from "express";
import { craeteNewUser } from "../dal/user.dal";
import jwt from "jsonwebtoken";
import { generateTokens, saveRefreshToken } from "../utils/token.util";

export const googleCallBack = async (req: Request, res: Response) => {
  const user: any = req.user;
  const tokens = generateTokens(user);
  await saveRefreshToken(user.id, tokens.refreshToken);

  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    tokens.refreshToken,
    {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }
  );

  res.json({ token: tokens.accessToken });
};

export const localLoginCallBack = async (req: Request, res: Response) => {
  const user: any = req.user;
  const tokens = generateTokens(user);
  await saveRefreshToken(user.id, tokens.refreshToken);

  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    tokens.refreshToken,
    {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }
  );

  res.json({ token: tokens.accessToken });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, firstname, lastname, email, password, avatarUrl } =
    req.body;

  try {
    await craeteNewUser(
      {
        userName: username,
        firstName: "lior",
        lastName: "cher",
        email,
      },
      avatarUrl,
      password
    );

    res.status(200).send("successfully login");
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
