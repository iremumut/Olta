import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deletePost,
  /*createPost, */ getAllPosts,
  reset,
} from "../features/posts/postSlice";

const Home = () => {
  //const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  /*useEffect(() => {
    const post = {
      title: `${user.name}'s first post created from react app.`,
      contentType: "text",
      contentURL: "url here",
      description: "Hope this works. Fingers crossed",
      tags: ["Hello", "FirstPost", "SunnyDay"],
    };
    dispatch(createPost(post));
  }, [user, dispatch]);*/

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else {
      dispatch(getAllPosts());
    }
    dispatch(deletePost("6294e85dea5218d95f5cc3b3"));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <p>Home Page</p>
      <ul>
        {(posts || isSuccess) &&
          posts.map((post) => {
            return (
              <li key={post._id}>
                {post.title} - {post.contentType} - {post.description}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;
