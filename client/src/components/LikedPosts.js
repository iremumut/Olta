import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Post from "./Post";
import uuid from "react-uuid";

const LikedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [noPost, setNoPost] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user: loggedUser } = useSelector((state) => state.auth);

  const { user } = useOutletContext();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedUser.token}`,
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`http://localhost:5000/users/${user._id}/likedPosts`, config)
        .then((res) => res.data)
        .then((data) => {
          if (typeof data === "undefined" || data.length === 0) {
            console.log("here");
            setNoPost(true);
          } else {
            setPosts(data);
            setNoPost(false);
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          //toast.error(error.response.data.message);
        });
    };

    fetchPosts();

    const fetchUsers = async (userid) => {
      await axios
        .get(`http://localhost:5000/users/${userid}`, config)
        .then((res) => res.data)
        .then((data) => setUsers((prev) => [...prev, data]))
        .catch((error) => {
          setError(true);
          toast.error(error.response.data.message);
        });
    };

    const findUsers = async () => {
      await posts.forEach((post) => {
        fetchUsers(post.creator);
      });
    };

    findUsers();

    if (
      (!noPost && posts.length !== 0 && users.length !== 0) ||
      (noPost && posts.length === 0)
    ) {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [posts, noPost]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      {noPost ? <p>No posts found</p> : ""}
      {!error && posts.length !== 0 && users.length !== 0 && !noPost
        ? posts.map((post) => {
            const creator = users.filter((user) => user._id === post.creator);
            return <Post key={uuid()} post={post} creator={creator} />;
          })
        : ""}
    </div>
  );
};

export default LikedPosts;
