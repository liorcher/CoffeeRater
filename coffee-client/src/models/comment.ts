export interface CreateComment {
    content: string;
    rating: number;
    commentTime: string;
    photo: FormData | null;
    postId: string;
};

export interface UpdateComment {
    commentId: string;
    content: string;
    rating: number;
    commentTime: string;
};

export interface Comment {
    commentId: string;
    text: string;
    userId: string;
    rating: number;
    time: string;
    avatarUrl: string;
    postId: string;
}  