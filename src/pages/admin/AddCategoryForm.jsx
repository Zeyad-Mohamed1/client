import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Name is required");

    dispatch(createCategory({ title }));
    setTitle("");
  };
  return (
    <div className="add-category">
      <h3 className="add-category-title">Add Category</h3>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Name</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="title"
            placeholder="Enter Category Name"
          />
        </div>
        <button className="add-category-btn" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
