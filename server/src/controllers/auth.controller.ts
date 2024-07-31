import { Request, Response, NextFunction } from "express";
import { craeteNewUser } from "../dal/user.dal";
import jwt from "jsonwebtoken";
import { generateTokens, saveRefreshToken } from "../utils/token.util";

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google callback
 *     description: Handles Google OAuth callback and generates tokens.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
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

/**
 * @swagger
 * /auth/local/callback:
 *   post:
 *     summary: Local login callback
 *     description: Handles local login callback and generates tokens.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user and returns a success message.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered.
 *       500:
 *         description: Error registering new user.
 */
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

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logs out the user and redirects to the home page.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirected to home page.
 */
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
