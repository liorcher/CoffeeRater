import { getComments } from "./commentsFetchApi";
import { CommentData } from "../models/comment";
import { PostData } from "../models/post";
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



export const getPostsWithComments = async () => {
  const posts = await fetchPosts();
  const comments = await getComments();
  const postWithComments = posts.map((post: PostData) => {
    post.comments = comments.filter(
      (comment: CommentData) => comment.postId === post._id
    );

    return post;
  });

  return postWithComments;
};

export const getPostWithComment = async (postId: string, commentId: string) => {
  const posts = await getPostsWithComments();
  const post = posts.filter((post: PostData) => post._id === postId)[0];
  console.log(post) 
  post.comments = post.comments.filter((comment: CommentData) => comment.commentId === commentId)

  return post;
};