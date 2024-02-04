import { postActions } from "../slices/postSlice";
import { request } from "../../request";
import { toast } from "react-toastify";
import { commentActions } from "../slices/commentSlice";

// create comment
export function createComment(comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(`api/comments`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postActions.addComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// update comment
export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postActions.updateComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// delete comment
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postActions.deleteComment(commentId));
            dispatch(commentActions.deleteComment(commentId));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// get comments
export function getComments() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('/api/comments', {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(commentActions.setComments(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

