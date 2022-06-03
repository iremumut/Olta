import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Post from "./Post";
import uuid from "react-uuid";
import { useOutletContext } from "react-router-dom";

const UserPosts = () => {
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { user } = useOutletContext();
  useEffect(() => {
    const fetchPosts = async () => {
      if (isError) {
        toast.error(message);
      } else {
        await dispatch(getPosts());
        await dispatch(reset());
      }
    };
    fetchPosts();
  }, [isError, dispatch, message]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      {(isSuccess || posts) &&
        posts.map((post) => {
          return <Post key={uuid()} post={post} creator={user} />;
        })}
    </div>
  );
};

export default UserPosts;
