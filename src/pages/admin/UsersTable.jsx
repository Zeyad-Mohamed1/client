import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProfile,
  getAllprofiles,
} from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllprofiles());
  }, [dispatch, isProfileDeleted]);

  //Delete Post
  const deletePostHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you are able to recover this User!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(id));
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={profile.profilePhoto.url}
                      alt=""
                      className="table-user-image"
                    />
                    <p className="table-user-name">{profile?.username}</p>
                  </div>
                </td>
                <td>{profile?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${profile._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deletePostHandler(profile?._id)}>
                      Delete User
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

export default UsersTable;
