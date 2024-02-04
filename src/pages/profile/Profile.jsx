import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import { ThreeDots } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is No Image Provided");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you are able to recover this profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 130px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <ThreeDots
          visible={true}
          height="120"
          width="120"
          color="#e02200"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ "text-align": "center" }}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={handleSubmit}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button className="upload-profile-photo-btn" type="submit">
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          <strong>Bio: </strong>
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>
            {new Date(profile?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        {user?._id === profile?._id && (
          <>
            <button
              onClick={() => setOpen(true)}
              className="profile-update-btn"
            >
              <i className="bi bi-file-person-fill"></i>
              Update Profile
            </button>
            <button
              onClick={deleteAccountHandler}
              className="delete-account-btn"
            >
              <i
                style={{ color: "white", marginRight: "4px" }}
                className="bi bi-trash-fill"
              ></i>
              Delete Your Account
            </button>
          </>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post?._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>
      {open && <UpdateProfileModal profile={profile} setOpen={setOpen} />}
    </section>
  );
};

export default Profile;
