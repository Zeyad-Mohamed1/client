import "./category.css";
import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostsByCategory } from "../../redux/apiCalls/postsApiCall";
const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsByCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);
  return (
    <section className="category">
      {postsCate?.length === 0 ? (
        <>
          <h1 className="category-not-found">
            No posts found based on <span>{category}</span>
          </h1>
          <Link className="category-not-found-link" to="/posts">
            Back to posts
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
