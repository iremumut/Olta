import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  const [noPost, setNoPost] = useState(false);

  const [doneFetching, setDoneFetching] = useState(false);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user: loggedUser } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${loggedUser.token}`,
    },
  };

  useEffect(() => {
    //console.log("here");
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:5000/posts/followed", config)
        .then((res) => res.data)
        .then((data) => {
          if (typeof data === "undefined" || data.length === 0) {
            setNoPost(true);
          } else {
            data.forEach(async (post) => {
              await axios
                .get(`http://localhost:5000/users/${post.creator}`, config)
                .then((res) => {
                  setCreators((prev) => [...prev, res.data]);
                })
                .catch((error) => {
                  setError(true);
                  toast.error(error.response.data.message);
                });
            });
            //setUsers(usersAll);
            setNoPost(false);
            setPosts(data);
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

  useEffect(() => {
    //console.log("here");
    if (
      (posts.length !== 0 &&
        creators.length !== 0 &&
        posts.length === creators.length) ||
      noPost
    ) {
      setLoading(false);
    }
  }, [posts, creators, noPost]);

  //console.log(loading);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="3xl:basis-1/3 xl:basis-2/4 lg:basis-2/3 basis-full  w-full">
          {noPost ? <p>No posts, follow other people to see posts</p> : ""}
          {!loading &&
            !noPost &&
            doneFetching &&
            !error &&
            posts.map((post) => {
              const creator = creators.find((x) => x._id === post.creator);
              return (
                <Post
                  post={post}
                  creator={creator}
                  singlePage={false}
                  key={uuid()}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Home;
