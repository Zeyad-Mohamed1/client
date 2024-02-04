import PostItem from "./PostItem";
import "./posts.css";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
