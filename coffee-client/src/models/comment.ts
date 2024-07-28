export interface CreateComment {
    text: string;
    userId: string;
    rating: number;
    time: string;
    postId: string;
};

export interface UpdateComment {
    text: string;
    rating: number;
    time: string;
};

export interface CommentProps {
    id: string;
    text: string;
    author: string;
    time: string;
    avatarUrl: string;
    isCurrentUser: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface Comment {
    text: string;
    userId: string;
    rating: number;
    time: string;
    avatarUrl: string;
    postId: string;
}  