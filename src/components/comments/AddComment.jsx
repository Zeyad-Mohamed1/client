import { useState } from "react";
import "./add-comment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";
const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please Type Something");
    dispatch(createComment({ text, postId }));
    setText("");
  };
  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
