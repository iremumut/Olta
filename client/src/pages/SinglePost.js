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
  const [post, setPost] = useState([]);
  const [creator, setCreator] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const fetchPost = async () => {
      const response = await axios
        .get(`http://localhost:5000/posts/${postid}`, config)
        .then((res) => res.data);
      setPost(response);
    };

    const fetchCreator = async () => {
      const response = await axios
        .get(`http://localhost:5000/posts/${postid}/creator`, config)
        .then((res) => res.data);
      setCreator(response);
    };

    const fetchComments = async () => {
      const response = await axios
        .get(`http://localhost:5000/posts/${postid}/comments`, config)
        .then((res) => res.data);
      setComments(response);
    };

    const postFound = posts.find((post) => post._id === postid);

    if (postFound) {
      setPost(postFound);
      const creator = users.filter((user) => {
        return user._id === post.creator;
      });

      if (creator.length !== 0) {
        setCreator(creator);
        fetchComments();
        setIsLoading(false);
      } else {
        Promise.all([fetchCreator(), fetchComments()]).then(() =>
          setIsLoading(false)
        );
      }
    } else {
      setIsLoading(true);
      Promise.all([fetchPost(), fetchCreator(), fetchComments()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [post.creator, postid, posts, user.token, users]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row justify-center ">
      <div className="2xl:w-1/2 lg:w-2/3 w-full lg:mx-0 mx-4">
        {post.length !== 0 && creator.length !== 0 ? (
          <Post
            post={post}
            creator={creator}
            singlePage={true}
            comments={comments}
            setComments={setComments}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SinglePost;
