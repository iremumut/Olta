import moment from "moment";
import Content from "./Content";

import share from "../assets/vectors/share.svg";
import comment from "../assets/vectors/comment.svg";
import like from "../assets/vectors/like.svg";
import support from "../assets/vectors/support.svg";
import send from "../assets/vectors/send.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { likePost } from "../features/posts/postSlice";

const Post = ({ post, creator }) => {
  const timeFormat = moment(post.createdAt).startOf("hour").fromNow(); //.startOf("day").fromNow();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (creator._id === user._id) {
      setIsLoggedIn(true);
    }
  }, [creator._id, user._id]);

  const handleLikePost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/posts/${post._id}/likes`,
        {},
        config
      );
      console.log(res);
      dispatch(likePost({ postid: post._id, userid: user._id }));
      toast.success("Liked the post");
    } catch (error) {
      console.log("here");
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className=" bg-white  md:p-4 md:px-10 p-4 my-6 flex flex-col rounded-lg">
        <div className="flex flex-row py-4">
          <Link
            to={isLoggedIn ? "/users/me/posts" : `users/${creator._id}/posts`}
          >
            <img
              className="h-16 w-16 rounded-full mr-3 "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
          </Link>
          <div>
            <Link
              to={isLoggedIn ? "/users/me/posts" : `users/${creator._id}/posts`}
            >
              <p className="text-[#4E5D78] text-base font-medium">
                {creator && creator.name ? creator.name : "User"}
              </p>{" "}
            </Link>
            {/*@TODO create user slice and find the users name and photo from the server*/}
            <p className="text-[#A2AAB8] text-sm font-normal">
              {timeFormat}
              <br />
              {post.isFree ? "Public" : "Subscribers only"}
            </p>
          </div>
        </div>

        <Content
          title={post.title}
          contentType={post.contentType}
          contentURL={post.contentURL}
          description={post.description}
          tags={post.tags}
          id={post._id}
        />

        <div className="sm:flex hidden flex-row w-full justify-between py-4 items-end">
          <div className="mt-3 flex -space-x-2 overflow-hidden items-center">
            <img
              className="inline-block h-6 w-6 rounded-full ring-1 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-1  ring-white"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-blockh-6 w-6 rounded-full ring-1  ring-white"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-1  ring-white"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-1  ring-white"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>

          <div className="text-[#A2AAB8] text-sm font-normal ">
            {post.commentCount} comments {post.likeCount} likes{" "}
            {post.buyers.length} supporters
          </div>
        </div>

        <hr />

        <div className="flex flex-row w-full justify-between py-4">
          <button onClick={handleLikePost}>
            <img src={like} alt="" />
          </button>
          <button>
            <img src={support} alt="" />
          </button>
          <button>
            <img src={comment} alt="" />
          </button>
          <button>
            <img src={share} alt="" />
          </button>
        </div>

        <hr />

        <div className="flex flex-row w-full py-4 items-center">
          <div className="">
            <img
              className="h-10 w-10 rounded-full  "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
          </div>
          <div className="mx-4 w-4/5">
            <input
              placeholder="Write a comment..."
              className="h-10 rounded-lg bg-[#F6F7F8] w-full px-2 focus:outline-none"
            />
          </div>
          <div>
            <button className="w-9 h-9 rounded bg-[#EBF2FF] p-1 px-2">
              <img src={send} className="" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
