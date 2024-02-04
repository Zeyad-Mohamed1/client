import { useState } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postsApiCall";
const UpdatePostModal = ({ setOpen, post }) => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post?.title);
  const [desc, setDesc] = useState(post?.desc);
  const [category, setCategory] = useState(post?.caregory);
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (desc.trim() === "") return toast.error("Post Description is required");

    dispatch(updatePost({ title, desc, category }, post?._id));
    setOpen(false);
  };
  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setOpen(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          className="update-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="update-post-textarea"
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
