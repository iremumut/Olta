import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import send from "../assets/vectors/send.svg";
import { createComment, reset } from "../features/auth/authSlice";

const CreateComment = ({ setComments, postid, setCommentCount }) => {
  const [text, setText] = useState("");

  const { isError, isSuccess, message, comment } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { text: text };
    const params = {
      comment: newComment,
      postid: postid,
    };
    dispatch(createComment(params));
  };

  console.log(isError, isSuccess);

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      setText("");
      toast.success("Comment posted!");
      setComments((prev) => [...prev, comment]);
      setCommentCount((prev) => prev + 1);
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  return (
    <form
      className="flex flex-row w-full py-4 items-center"
      onSubmit={handleSubmit}
    >
      <div className="">
        <img
          className="h-12 w-12 rounded-full  "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          alt=""
        />
      </div>
      <div className="mx-4 w-4/5">
        <input
          placeholder="Write a comment..."
          className="h-12 rounded-lg bg-[#F6F7F8] w-full px-2 focus:outline-none"
          value={text}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="w-12 h-12 rounded bg-[#EBF2FF] p-1 px-3"
          type="submit"
        >
          <img src={send} className="" alt="" />
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
