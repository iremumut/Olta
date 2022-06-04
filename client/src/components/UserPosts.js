import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Post from "./Post";
import uuid from "react-uuid";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user: loggedUser } = useSelector((state) => state.auth);

  const { user } = useOutletContext();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    };

    const fetchUsersPosts = async () => {
      await axios
        .get(`http://localhost:5000/users/${user._id}/posts`, config)
        .then((res) => res.data)
        .then((data) => setPosts(data))
        .then(() => setLoading(false))
        .catch((error) => {
          setError(true);
          toast.error(error.response.data.message);
        });
    };

    fetchUsersPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      {!error && posts.length === 0 ? <p>No posts found</p> : ""}
      {!error && posts.length !== 0
        ? posts.map((post) => {
            return <Post key={uuid()} post={post} creator={user} />;
          })
        : ""}
    </div>
  );
};

export default UserPosts;
