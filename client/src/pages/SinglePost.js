import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

const SinglePost = () => {
  const { postid } = useParams();
  const { posts } = useSelector((state) => state.post);

  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [creator, setCreator] = useState();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const fetchPost = async () => {
      console.log("in fetch post");
      const response = await axios
        .get(`http://localhost:5000/posts/${postid}`, config)
        .then((res) => res.data);
      setPost(response);
    };

    const fetchCreator = async () => {
      console.log("in fetch creator");
      const response = await axios
        .get(`http://localhost:5000/posts/${postid}/creator`, config)
        .then((res) => res.data);
      setCreator(response);
    };

    const postFound = posts.find((post) => post._id === postid);
    if (postFound) {
      setPost(postFound);
      const creator = users.find((x) => x._id === post.creator);
      setCreator(creator);
      setIsLoading(false);
    } else {
      console.log("here");
      setIsLoading(true);
      Promise.all([fetchPost(), fetchCreator()]).then(() => {
        console.log("does this work");
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(post);
  console.log(creator);
  return (
    <div className="flex flex-row justify-center ">
      <div className="w-1/2">
        <Post post={post} creator={creator} />
      </div>
    </div>
  );
};

export default SinglePost;
