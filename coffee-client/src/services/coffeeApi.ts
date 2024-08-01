import { getComments } from "./commentsFetchApi";
import { Comment } from "../models/comment";
const API_URL = "https://fake-coffee-api.vercel.app/api";

export const fetchPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch posts");
  }
  let response_json = await response.json();
  return response_json;
};

interface PostProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  region: string;
  weight: number;
  flavorProfile: string[];
  grindOption: string[];
  roastLevel: number;
  imageUrl: string;
  comments: Comment[];
}

export const getPostsWithComments = async () => {
  const posts = await fetchPosts();
  const comments = await getComments();
  const postWithComments = posts.map((post: PostProps) => {
    post.comments = comments.filter(
      (comment: Comment) => comment.postId === post._id
    );

    return post;
  });

  return postWithComments;
};
