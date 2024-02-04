import { Link } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ email, password }));
  };
  return (
    <section className="form-container">
      <h1 className="form-title">Login to Your Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button className="form-btn" type="submit">
          Login
        </button>
      </form>
      <div className="form-footer">
        Did you forgot your password? <Link to="/forgot-password">Reset</Link>
      </div>
    </section>
  );
};

export default Login;
