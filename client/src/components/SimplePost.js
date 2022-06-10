import moment from "moment";
import { Link } from "react-router-dom";
import Content from "./Content";
import ethereum from "../assets/vectors/ethereum.svg";

const SimplePost = ({ post, creator }) => {
  const timeFormat = moment(post.createdAt).startOf("hour").fromNow();
  return (
    <>
      <div className=" bg-white  md:p-4 md:px-10 p-4 my-6 flex flex-col rounded-lg">
        <div className="flex flex-row py-4">
          <Link to={`/users/${creator._id}/posts`}>
            <img
              className="h-16 w-16 rounded-full mr-3 "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
          </Link>
          <div>
            <Link to={`/users/${creator._id}/posts`}>
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

        <div className="bg-[#EBF2FF] flex flex-col rounded-xl px-8 py-4 justify-center items-center self-center text-center w-4/5 mt-2">
          <div className="flex flex-row items-center">
            <p className="text-[#0368FF] font-normal mr-2 text-lg">
              Support this content for{" "}
            </p>
            <p className=" text-[#0368FF] font-semibold text-2xl">
              {post.price}
            </p>
            <img src={ethereum} alt="" />
          </div>
          <div className="">
            When you support, you will have access to the content forever
            without any limitation.
          </div>
        </div>
      </div>
    </>
  );
};

export default SimplePost;
