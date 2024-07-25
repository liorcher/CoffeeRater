import { Date, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IPost extends Document {
  postId: string;
  userId: string;
  time: Date;
  content: string;
  imageUrl: string;
}

const postSchema = new Schema({
  postId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  userId: { type: String, required: true },
  author: { type: String, required: true },
  time: { type: Date, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Post = model<IPost>("post", postSchema);

export default Post;
