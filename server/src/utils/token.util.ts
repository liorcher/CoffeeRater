import RefreshToken from "../models/refreshToken";
import jwt from "jsonwebtoken";

export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // Set expiry date for 7 days from now

  const newToken = new RefreshToken({
    userId,
    token: refreshToken,
    expiryDate,
  });
  await newToken.save();
};

export const removeRefreshToken = async (userId: string) => {
  await RefreshToken.deleteMany({ userId });
};

export const findRefreshToken = async (token: string) => {
  return await RefreshToken.findOne({ token });
};

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
