import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IUser extends Document {
  userId: string;
  userName: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  userName: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model<IUser>("user", userSchema);

export default User;
