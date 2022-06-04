import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Post from "./Post";
import uuid from "react-uuid";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const UserPosts = () => {
  const {
    posts: loggedInUserPosts,
    isLoading: loggedInUserLoading,
    isError,
    message,
  } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { user: loggedInUser } = useSelector((state) => state.auth);

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

    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    const fetchUsersPosts = async () => {
      try {
        const response = await axios
          .get(`http://localhost:5000/users/${user._id}/posts`, config)
          .then((res) => res.data);
        setPosts(response);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (user.token) {
      fetchPosts();
      setPosts(loggedInUserPosts);
      setLoading(false);
    } else {
      setLoading(true);
      fetchUsersPosts();
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      setLoading(false);
    }
  }, [posts]);

  if (loggedInUserLoading || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      {!loggedInUserLoading && !loading && posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        ""
      )}
      {posts.length !== 0
        ? posts.map((post) => {
            return <Post key={uuid()} post={post} creator={user} />;
          })
        : ""}
    </div>
  );
};

export default UserPosts;
