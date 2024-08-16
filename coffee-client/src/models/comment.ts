import { ChildComment } from "./childComment";

export interface CreateComment {
  content: string;
  rating: number;
  commentTime: string;
  photo: FormData | null;
  postId: string;
};
export interface CommentData {
  postId: string;
  commentId: string;
  author: string;
  content: string;
  avatarUrl: string;
  commentTime: string;
  rating: number;
  childComments: ChildComment[];
  photoUrl: string | null;
};

export interface UpdateComment {
  commentId: string;
  content: string;
  rating: number;
  commentTime: string;
};

export interface CommentProps {
  postId: string;
  commentId: string;
  author: string;
  content: string;
  avatarUrl: string;
  time: string;
  rating: number;
  photoUrl: string | null;
  canEdit: boolean;
  childComments: ChildComment[];
  onEdit: (newText: string, newRating: number) => void;
  onDelete: () => void;
}
