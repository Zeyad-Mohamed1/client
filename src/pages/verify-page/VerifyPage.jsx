import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
const VerifyPage = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [dispatch, userId, token]);

  return (
    <div className="verfiy-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verfiy-email-title">Email Verified</h1>
          <Link to="/login" className="verify-email-link">
            Go to Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verfiy-email-not-found">
            Not Found Email Verification.
          </h1>
        </>
      )}
    </div>
  );
};

export default VerifyPage;
