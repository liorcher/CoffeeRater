import axios from "axios";
import { CreateComment, UpdateComment} from '../models/comment';
import { uploadImage } from "./authFetchApi";

const BASE_URL = '/api/v1'

export const getComments = async () => {
    const response = await fetch(`${BASE_URL}/comments`);
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    let response_json = await response.json()
    return response_json;
};

export const createComment = async (comment: CreateComment) => {
    comment.photo = comment.photo && (await uploadImage(comment.photo));
    const response = await axios.post(`${BASE_URL}/comments/create`, comment, {
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true
    });
    if (!response.status) {
        throw new Error("Failed to upload comment");
      }
};

export const updateComment = async (comment: UpdateComment) => {
    const response = await axios.put(`${BASE_URL}/comments/update`, comment, {
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true
    });
    if (!response.status) {
        throw new Error("Failed to edit comment");
      }
};

export const deleteComment = async (commentId: string) => {
    const response = await fetch(`${BASE_URL}/comments/delete/${commentId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
};

