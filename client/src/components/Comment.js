import moment from "moment";
import { Link } from "react-router-dom";
import arrow from "../assets/vectors/arrow.svg";

const Comment = ({ comment, user }) => {
  console.log(comment);
  return (
    <div className="bg-white rounded-xl flex flex-col w-full py-4 px-6 my-2">
      <div className="flex flex-row items-center ">
        <img
          className="h-12 w-12 rounded-full mr-2"
          alt=""
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          }
        />
        <p className="text-[#4E5D78] font-light text-lg mr-2">{user.name}</p>
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
      <div className="flex flex-row justify-between">
        <div className="text-[#A2AAB8] font-normal py-2">{comment.text}</div>
        <Link to={`/posts/${comment.postID}`}>
          {" "}
          <img src={arrow} />
        </Link>
      </div>
    </div>
  );
};

export default Comment;
