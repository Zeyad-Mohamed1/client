import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./header.css";
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
const HeaderRight = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="header-right-user-info"
            >
              <span className="header-right-username">{user?.username}</span>
              <img
                style={{ cursor: "pointer" }}
                src={user?.profilePhoto.url}
                className="header-right-user-image"
                alt=""
              />
            </div>
            {open && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={handleLogout} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login">
            <div className="header-right-link">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </div>
          </Link>
          <Link to="/register">
            <div className="header-right-link">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
