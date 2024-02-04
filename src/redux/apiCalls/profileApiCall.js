import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import { request } from "../../request";
import { toast } from "react-toastify";

// Get User Profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}


// Upload profile photo
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post('api/users/profile/profile-photo-upload',
                newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data",
                }
            }
            );
            dispatch(authActions.setUserPhoto(data.profilePhoto));
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

// Update Profile
export function updateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.updateProfile(data));
            dispatch(authActions.setUsername(data.username));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

// Delete Profile
export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileActions.setLoading());
            const { data } = await request.delete(`api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(data?.message);
            setTimeout(() => {
                dispatch(profileActions.clearIsProfileDeleted());
            }, 2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearLoading());
        }
    };
}

export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('api/users/count', {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });
            dispatch(profileActions.setUsersCount(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// get all users
export function getAllprofiles() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('/api/users/profile', {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            });

            dispatch(profileActions.setProfiles(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

