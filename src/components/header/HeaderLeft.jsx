import { Link } from "react-router-dom";
import "./header.css";
const HeaderLeft = ({ setOpen, open }) => {
  return (
    <div className="header-left">
      <Link to="/">
        <div className="header-logo">
          <strong>BLOG</strong>
          <i className="bi bi-pencil"></i>
        </div>
      </Link>
      <div onClick={() => setOpen((prev) => !prev)} className="header-menu">
        {open ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
      </div>
    </div>
  );
};

export default HeaderLeft;
