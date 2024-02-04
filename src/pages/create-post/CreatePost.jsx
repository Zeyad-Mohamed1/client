import { useEffect, useState } from "react";
import "./create-post.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postsApiCall";
import { RotatingLines } from "react-loader-spinner";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";
const CreatePost = () => {
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState(null);

  // Form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (cat.trim() === "") return toast.error("Post Category is required");
    if (desc.trim() === "") return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", cat);

    dispatch(createPost(formData));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  return (
    <section className="create-post">
      <ToastContainer />
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="create-post-input"
        >
          <option value="" disabled>
            Select A Category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
