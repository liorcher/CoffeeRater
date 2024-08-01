import { CreateComment, UpdateComment} from '../models/comment';

const BASE_URL = 'http://localhost:9000/api/v1'

export const getComments = async () => {
    const response = await fetch(`${BASE_URL}/comments`);
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to fetch comments');
    }
    let response_json = await response.json()
    return response_json;
};

export const createComment = async (comment: CreateComment) => {
    const response = await fetch(`${BASE_URL}/comments/create`, {
        body: JSON.stringify(comment),
        method: "POST"
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to create comment');
    }
};

export const updateComment = async (comment: UpdateComment) => {
    const response = await fetch(`${BASE_URL}/comments/update`, {
        body: JSON.stringify(comment),
        method: "PUT"
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to update comment');
    }
};

export const deleteComment = async (commentId: string) => {
    const response = await fetch(`${BASE_URL}/comments/delete/${commentId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to delete comment');
    }
};

