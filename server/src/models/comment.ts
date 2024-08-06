import { Date, Number, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type commentData = {
  commentId?: String;
  postId?: String;
  userId?: String;
  photoUrl?: String;
  content?: String;
  rating?: Number;
  commentTime?: Date;
  updateTime?: Date;
  isDeleted?: Boolean;
};

export type IComment = commentData & Document;

const commentSchema = new Schema({
  commentId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  photoUrl: {type: String, required: false},
  postId: { type: String, required: true },
  userId: { type: String, ref: 'user', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: false },
  commentTime: { type: Date, required: true },
  updateTime: { type: Date, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
});

export const Comment = model<IComment>("Comment", commentSchema);
