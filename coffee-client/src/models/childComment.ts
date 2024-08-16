export interface ChildComment {
  childCommentId: string;
  content: string;
  commentTime: string;
  author: string;
  avatarUrl: string;
}

export interface CreateChildComment {
  content: string;
  commentId: string;
  commentTime: string;
}

export interface UpdateChildComment {
  content: string;
  commentId: string;
  commentTime: string;
  childCommentId: string;
}

export interface ChildCommentProps {
  content: string;
  commentTime: string;
  author: string;
  avatarUrl: string;
  canEdit: boolean;
  onEdit: (newText: string) => void;
  onDelete: () => void;
}