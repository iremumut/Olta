import moment from "moment";
import Content from "./Content";

import share from "../assets/vectors/share.svg";
import comment from "../assets/vectors/comment.svg";
import like from "../assets/vectors/like.svg";
import support from "../assets/vectors/support.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { likePost, unlikePost } from "../features/posts/postSlice";
import {
  likePost as likePostAuth,
  unlikePost as unlikePostAuth,
  reset,
} from "../features/auth/authSlice";
import uuid from "react-uuid";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment.";
import ethereum from "../assets/vectors/ethereum.svg";
import heart from "../assets/vectors/heart.svg";

const Post = ({ post, creator, singlePage, comments, setComments }) => {
  const timeFormat = moment(post.createdAt).startOf("hour").fromNow(); //.startOf("day").fromNow();
  const { user } = useSelector((state) => state.auth);

  //const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likesCount, setLikesCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [liked, setLiked] = useState(user.likedPosts.includes(post._id));

  if (creator && creator.constructor === Array) {
    creator = creator[0];
  }

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (creator._id === user._id) {
      setIsLoggedIn(true);
    }
  }, [creator._id, user._id]);

  const handleLikePost = async () => {
    Promise.all([dispatch(likePostAuth(post._id))])
      .then((res) => {
        if (res[0].error) {
          toast.error(res[0].payload);
        } else {
          toast.success("Liked the post");
          dispatch(likePost({ postid: post._id, userid: user._id }));
          setLikesCount((prev) => prev + 1);
          setLiked(true);
        }
      })
      .then(() => {
        dispatch(reset());
      });
  };

  const handleUnlikePost = async () => {
    Promise.all([dispatch(unlikePostAuth(post._id))])
      .then((res) => {
        if (res[0].error) {
          toast.error(res[0].payload);
        } else {
          toast.success("Unliked the post");
          dispatch(unlikePost({ postid: post._id, userid: user._id }));
          setLikesCount((prev) => prev - 1);
          setLiked(false);
        }
      })
      .then(() => {
        dispatch(reset());
      });
  };

  return (
    <>
      <div className=" bg-white  md:p-4 md:px-10 p-4 my-6 flex flex-col rounded-lg">
        <div className="flex flex-row py-4 justify-start">
          <Link
            to={isLoggedIn ? "/users/me/posts" : `/users/${creator._id}/posts`}
          >
            <img
              className="h-16 w-16 rounded-full mr-3 "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
          </Link>
          <div>
            <Link
              to={
                isLoggedIn ? "/users/me/posts" : `/users/${creator._id}/posts`
              }
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
          <div className="ml-auto text-[#4E8BFF] text-lg font-normal">
            {post.price && post.price !== 0 ? (
              <>
                <p className="inline">{post.price}</p>
                <img className="inline h-8 w-8" src={ethereum} alt="" />
              </>
            ) : (
              ""
            )}
            {post.updated ? "Edited" : ""}
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
            {commentCount} comments {likesCount} likes {post.buyers.length}{" "}
            supporters
          </div>
        </div>

        <hr />

        <div className="flex flex-row w-full justify-between py-4">
          <button
            onClick={liked ? handleUnlikePost : handleLikePost}
            className="flex flex-row items-center"
          >
            <img src={liked ? heart : like} alt="" className="" />
            <p className="pl-2 font-medium text-lg  text-[#5C6A83]"> Like</p>
          </button>
          <button className="flex flex-row items-center">
            <img src={comment} alt="" className="" />
            <p className="pl-2 font-medium text-lg  text-[#5C6A83]">
              {" "}
              Comments
            </p>
          </button>
          <Link
            to={
              post.creator === user._id
                ? "/users/me/posts"
                : post.isFree
                ? `/users/${creator._id}`
                : `/transaction/${post._id}`
            }
            state={{ post: post, creator: creator }}
            className="flex flex-row items-center"
          >
            <img src={support} alt="" className="" />
            <p className="pl-2 font-medium text-lg  text-[#5C6A83]"> Support</p>
          </Link>
          <button className="flex flex-row items-center">
            <img src={share} alt="" className="" />
            <p className="pl-2 font-medium text-lg  text-[#5C6A83]"> Share</p>
          </button>
        </div>

        <hr />

        {/**comments part */}

        {singlePage ? (
          <div className="flex flex-col my-2">
            {comments.length !== 0 ? (
              comments.map((comment) => {
                return <PostComment key={uuid()} comment={comment} />;
              })
            ) : (
              <p className="pb-2 text-[#A2AAB8]  font-light">No comments</p>
            )}
            <hr />
          </div>
        ) : (
          ""
        )}

        <CreateComment
          setComments={setComments}
          postid={post._id}
          setCommentCount={setCommentCount}
          singlePage={singlePage}
        />
      </div>
    </>
  );
};

export default Post;
