import { Date, Number, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type commentData = {
  commentId?: String;
  postId?: String;
  userId?: String;
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
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: false },
  commentTime: { type: Date, required: true },
  updateTime: { type: Date, required: false },
  isDeleted: { type: Boolean, required: true, default: true },
});

export const Comment = model<IComment>("Comment", commentSchema);
