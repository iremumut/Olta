import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllPosts, reset } from "../features/posts/postSlice";
import { getAllUsers, reset as userReset } from "../features/users/userSlice";
import Post from "../components/Post";
import uuid from "react-uuid";

const Explore = () => {
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  //const copyPosts = [...posts].reverse();

  useEffect(() => {
    const fetchPosts = async () => {
      if (isError || user.isError) {
        toast.error(message);
      } else {
        await dispatch(getAllPosts());
        await dispatch(reset());
      }
    };

    const fetchUsers = async () => {
      if (user.isError) {
        toast.error(message);
      } else {
        await dispatch(getAllUsers());
        await dispatch(userReset());
      }
    };

    fetchPosts();
    fetchUsers();

    return () => {
      dispatch(reset());
      dispatch(userReset());
    };
  }, [dispatch, isError, message, user.isError]);

  if (isLoading || user.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="3xl:basis-1/3 xl:basis-2/4 lg:basis-2/3 basis-full  w-full">
          {(posts || isSuccess) &&
            posts.map((post) => {
              const creator = user.users.find((x) => x._id === post.creator);
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
};

export default Explore;
