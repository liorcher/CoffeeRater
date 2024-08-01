import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export type UserBasicData = {
  userId?: string;
  userName: string;
  avatarUrl?: string | null;
  firstName: string;
  lastName: string;
  email: string;
};

export type IUser = UserBasicData &
  Document & {
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
  };

const userSchema: Schema<IUser> = new Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  userName: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>("user", userSchema);

export default User;
