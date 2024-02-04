import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteComment,
  getComments,
} from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  //Delete Comment
  const deleteCommentHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you are able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(id));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <p className="table-user-name">{item?.username}</p>
                  </div>
                </td>
                <td>{item?.text}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item?._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsTable;
