import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories?.map((category) => (
          <Link
            className="sidebar-link"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
