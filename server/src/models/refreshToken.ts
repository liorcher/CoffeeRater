import mongoose, { Document, Schema } from "mongoose";

interface IRefreshToken extends Document {
  userId: string;
  token: string;
  expiryDate: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiryDate: { type: Date, required: true },
});

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);

export default RefreshToken;
