import "./form.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";
const ResetPassword = () => {
  const { isError } = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token, dispatch]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, { userId, token }));
  };
  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password of Your Account</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
