export interface CreateComment {
    content: string;
    rating: number;
    commentTime: string;
    photoUrl: string | null;
    postId: string;
};

export interface UpdateComment {
    commentId: string;
    content: string;
    rating: number;
    time: string;
};

export interface Comment {
    text: string;
    userId: string;
    rating: number;
    time: string;
    avatarUrl: string;
    postId: string;
}  