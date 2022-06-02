import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  //deletePost,
  /*createPost, */ getAllPosts,
  reset,
} from "../features/posts/postSlice";
import Post from "../components/Post";
import uuid from "react-uuid";

const Home = () => {
  //const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const copyPosts = [...posts].reverse();
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
    const fetch = async () => {
      if (isError) {
        toast.error(message);
      } else {
        await dispatch(getAllPosts());
        await dispatch(reset());
      }
    };

    fetch();

    //dispatch(deletePost("6294e85dea5218d95f5cc3b3"));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <ul className="xl:basis-2/3">
          {(posts || isSuccess || copyPosts) &&
            copyPosts.map((post) => {
              return (
                <li key={uuid()}>
                  <Post post={post} />
                </li>
              );
            })}
        </ul>

        {/*<div className="">Profile part</div>*/}
      </div>
    </div>
  );
};

export default Home;
