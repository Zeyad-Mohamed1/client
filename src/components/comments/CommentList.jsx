import swal from "sweetalert";
import "./comment-list.css";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  //Update Comment
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };
  //Delete Comment
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you are able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };
  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div className="comment-item" key={comment?._id}>
          <div className="comment-item-info">
            <div className="comment-item-username">{comment?.username}</div>
            <div className="comment-item-time">
              {moment(comment?.createdAt).fromNow()}
            </div>
          </div>
          <p className="comment-item-text">{comment?.text}</p>
          {user?._id === comment?.user && (
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
