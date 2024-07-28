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

  res.redirect("/");
};

export const localLoginCallBack = async (req: Request, res: Response) => {
  const user: any = req.user;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, { httpOnly: true, secure: true });
  res.redirect("/");
};

export const registerUser = async (req: Request, res: Response) => {
  const { userName, firstName, lastName, email, password, avatarUrl } =
    req.body;

  try {
    await craeteNewUser(
      {
        userName,
        firstName,
        lastName,
        email,
      },
      avatarUrl,
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
