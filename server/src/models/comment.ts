import { Date, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IComment extends Document {
  commentId: string;
  userId: string;
  content: string;
  commentTime: Date;
  updateTime: Date;
}

const commentSchema = new Schema({
  commentId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  commentTime: { type: Date, required: true },
  updateTime: { type: Date, required: true },
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
