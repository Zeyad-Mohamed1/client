import { request } from "../../request";
import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";

// Login
export function loginUser(user) {
    return async (dispatch) => {
        try {
            // const response = await fetch("http://localhost:8000/api/auth/login", {
            //     method: "POST",
            //     body: JSON.stringify(user),
            //     headers: {
            //         "Content-Type": "application/json",
            //     }
            // });
            // const data = await response.json();
            const res = await request.post("api/auth/login", user);
            dispatch(authActions.login(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// Logout
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
    }
}

// Register
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("api/auth/register", user);
            dispatch(authActions.register(data.message));
        } catch (error) {
            dispatch(authActions.setIsError(error.response.data.message));
            setTimeout(() => {
                dispatch(authActions.resetIsError());
            }, 5000);
            toast.error(error.response.data.message);
        }
    }
}

// Verify
export function verifyEmail(userId, token) {
    return async (dispatch) => {
        try {
            await request.get(`api/auth/${userId}/verify/${token}`);
            dispatch(authActions.setIsEmailVerified());
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}