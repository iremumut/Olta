import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Post from "./Post";
import uuid from "react-uuid";

const LikedPosts = () => {
  const [posts, setPosts] = useState([]);

  const [noPost, setNoPost] = useState(false);

  const [doneFetching, setDoneFetching] = useState(false);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  const { user: loggedUser } = useSelector((state) => state.auth);

  const { user } = useOutletContext();

  const config = {
    headers: {
      Authorization: `Bearer ${loggedUser.token}`,
    },
  };

  useEffect(() => {
    //console.log("here");
    const fetchPosts = async () => {
      await axios
        .get(`http://localhost:5000/users/${user._id}/likedPosts`, config)
        .then(async (res) => {
          if (typeof res.data === "undefined" || res.data.length === 0) {
            setNoPost(true);
            setLoading(false);
          } else {
            await axios
              .get(`http://localhost:5000/users`, config)
              .then((res) => {
                setCreators(res.data);
              })
              .catch((error) => {
                setError(true);
                toast.error(error.response.data.message);
              });
            //setUsers(usersAll);
            setNoPost(false);
            setPosts(res.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          //toast.error(error.response.data.message);
        });
    };

    Promise.all([fetchPosts()]).then(() => {
      setDoneFetching(true);
    });

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      {noPost ? <p>No posts found</p> : ""}
      {!loading && !noPost && doneFetching
        ? posts.map((post) => {
            const creator = creators.filter((user) => {
              return user._id === post.creator;
            });
            return <Post key={uuid()} post={post} creator={creator} />;
          })
        : ""}
    </div>
  );
};

export default LikedPosts;
