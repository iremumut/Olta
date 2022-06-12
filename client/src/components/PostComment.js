import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import edit from "../assets/vectors/edit.svg";
import deleteIcon from "../assets/vectors/delete.svg";
import approve from "../assets/vectors/approve.svg";
import {
  reset,
  updateComment,
  deleteComment as deleteCommentAction,
} from "../features/auth/authSlice";

const PostComment = ({ comment, setComments, setCommentCount }) => {
  const {
    user: loggedUser,
    isError,
    message,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);

  const [text, setText] = useState(comment.text);

  const config = {
    headers: {
      Authorization: `Bearer ${loggedUser.token}`,
    },
  };

  const [user, setUser] = useState("");

  const fetchCommentUser = async (comment) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${comment.userID}`,
        config
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCommentUser(comment);
    // eslint-disable-next-line
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleEdit = () => {
    const newComment = {
      _id: comment._id,
      postID: comment.postID,
      userID: comment.userID,
      text: text,
      edited: true,
    };

    Promise.all([dispatch(updateComment(newComment))]).then((res) => {
      if (isError || message) {
        toast.error(message);
      } else {
        setEditOpen(false);
        comment.text = text;
        toast.success("Edited the comment!");
      }
      dispatch(reset());
    });
  };

  const deleteComment = () => {
    Promise.all([dispatch(deleteCommentAction(comment._id))]).then(() => {
      if (isError || message) {
        toast.error(message);
      } else {
        setComments((prev) =>
          prev.filter((com) => {
            return com._id !== comment._id;
          })
        );
        setCommentCount((prev) => prev - 1);
        toast.success("Deleted the comment");
      }
      dispatch(reset());
    });
  };

  return (
    <div className="flex flex-row m-2 my-4 items-center justify-start">
      <img
        className="h-10 w-10 rounded-full mr-2"
        alt=""
        src={
          user.profilePicture
            ? user.profilePicture
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
        }
      />
      <div className="rounded-xl bg-gradient-to-b from-white to-neutral-200 px-4 py-2 w-full">
        <div className="flex flex-row items-center">
          <Link
            to={`/users/${loggedUser._id === user._id ? "me" : user._id}/posts`}
          >
            <p className="pr-2 text-[#4E5D78] hover:text-[#4E5D78]/30 font-light text-sm">
              @{user.userName}
            </p>
          </Link>
          <p className="text-[#A2AAB8] text-xs font-light">
            {comment.edited
              ? moment(comment.updatedAt).format("MMM Do YY")
              : moment(comment.createdAt).format("MMM Do YY")}
          </p>

          <div className="flex flex-row ml-auto flex-wrap">
            {comment.edited ? (
              <p className="text-[#A2AAB8] text-xs font-light px-4">Edited</p>
            ) : (
              ""
            )}
            {loggedUser.comments.includes(comment._id) ? (
              <>
                <button onClick={() => setEditOpen((prev) => !prev)}>
                  <img src={edit} alt="" className="px-1 w-5 h-5" />
                </button>
                <button onClick={deleteComment}>
                  <img src={deleteIcon} alt="" className="px-1 w-5 h-5" />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {editOpen ? (
          <>
            <div className="text-[#464646] font-normal pl-4 py-1 rounded-xl bg-inherit border shadow-md w-full my-1 flex flex-row">
              <input
                type={text}
                value={text}
                onChange={handleTextChange}
                className=" bg-inherit  focus:outline-none w-11/12"
              />
              <button
                className="h-5 w-5 hover:w-7 hover:h-6 "
                onClick={handleEdit}
              >
                <img src={approve} alt="" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-[#464646] font-normal">{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default PostComment;
