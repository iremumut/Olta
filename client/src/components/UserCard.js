import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  const { user: loggedUser } = useSelector((state) => state.auth);

  return (
    <Link
      to={
        user._id === loggedUser._id
          ? "/users/me/posts"
          : `/users/${user._id}/posts`
      }
      className="flex flex-col 3xl:basis-1/3 py-4  bg-white m-4 rounded-xl hover:shadow-lg justify-center "
    >
      <div className="flex flex-row items-center mb-4 3xl:px-8 px-4">
        <img
          className="md:h-16 md:w-16 h-14 w-14 rounded-full md:mr-4 mr-1 "
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          }
          alt=""
        />
        <p className="text-[#4E5D78] font-semibold text-xl text-center hover:drop-shadow-md capitalize">
          {user.name}
        </p>
      </div>
      {user.description ? (
        <div className="px-4 m-2 text-[#A2AAB8] text-sm text-center">
          {user.description}
        </div>
      ) : (
        ""
      )}
      <hr className="bg-[#0202024F] mb-2" />
      <div className="flex flex-row px-4 my-2 ">
        <div className="flex flex-col text-center px-2">
          <p className="font-semibold text-sm">{user.followers.length}</p>
          <p className="font-extralight text-sm">Followers</p>
        </div>
        <div className="flex flex-col text-center  px-2">
          <p className="font-semibold text-sm">{user.subscribers.length}</p>
          <p className="font-extralight text-sm">Subscribers</p>
        </div>
        <div className="flex flex-col text-center  px-2">
          <p className="font-semibold text-sm">{user.followed.length}</p>
          <p className="font-extralight text-sm">Following</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
