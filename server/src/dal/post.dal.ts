import Post from "../models/post";

export const getAllPosts = async () => {
  try {
    return await Post.find();
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
