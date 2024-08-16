import axios from "axios";
import { CreateChildComment, UpdateChildComment } from '../models/childComment';

const BASE_URL = '/api/v1'


export const createChildComment = async (childComment: CreateChildComment) => {
    const response = await axios.post(`${BASE_URL}/comments/${childComment.commentId}/createChild`,
        childComment,
        {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
    if (!response.status) {
        throw new Error("Failed to upload child comment");
    }
};

export const updateChildComment = async (childComment: UpdateChildComment) => {
    const response = await axios.put(`${BASE_URL}/comments/${childComment.commentId}/updateChild`,
        childComment,
        {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
    if (!response.status) {
        throw new Error("Failed to edit child comment");
    }
};


export const deleteChildComment = async (commentId: string, childCommentId: string) => {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}/deleteChild/${childCommentId}`);
    if (!response.status) {
        throw new Error("Failed to delete child comment");
    }
};

