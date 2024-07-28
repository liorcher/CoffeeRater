import router from "../routes";
import { Request, Response } from "express";
import {
  findRefreshToken,
  generateTokens,
  removeRefreshToken,
  saveRefreshToken,
} from "../utils/token.util";
import jwt from "jsonwebtoken";

router.post("/token", async (req: Request, res: Response) => {
  const refreshToken =
    req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

  if (!refreshToken) return res.sendStatus(401);

  const storedToken = await findRefreshToken(refreshToken);
  if (!storedToken) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      // Check if token is expired
      if (storedToken.expiryDate < new Date()) {
        await removeRefreshToken(user.id);
        return res.sendStatus(403);
      }

      // Generate new tokens
      const newTokens = generateTokens(user);
      await removeRefreshToken(user.id); // Invalidate the old refresh token
      await saveRefreshToken(user.id, newTokens.refreshToken); // Save the new refresh token

      res.cookie(
        process.env.REFRESH_TOKEN_COOKIE_NAME as string,
        newTokens.refreshToken,
        {
          httpOnly: true,
          secure: false, // Ensure this is set to true in production
          sameSite: "strict",
        }
      );

      res.json({ accessToken: newTokens.accessToken });
    }
  );
});
