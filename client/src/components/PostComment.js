import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostComment = ({ comment }) => {
  const { user: loggedUser } = useSelector((state) => state.auth);

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

  return (
    <div className="flex flex-row m-2 my-4 items-center">
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
          {comment.edited ? (
            <p className="text-[#A2AAB8] text-xs font-light  ml-auto">Edited</p>
          ) : (
            ""
          )}
        </div>
        <p className="text-[#464646] font-normal ">{comment.text}</p>
      </div>
    </div>
  );
};

export default PostComment;
