import moment from "moment";
import Content from "./Content";

const Post = ({ post }) => {
  const timeFormat = moment(post.createdAt).startOf("hour").fromNow(); //.startOf("day").fromNow();
  return (
    <div className="w-4/5 bg-white my-6 p-4 flex flex-col rounded-lg">
      <div className="flex flex-row py-4">
        <img
          className="h-16 w-16 rounded-full mr-3 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          alt=""
        />
        <div>
          <p className="text-[#4E5D78] text-base font-medium">
            {/*post.creator*/} Benjamin Case
          </p>{" "}
          {/*@TODO create user slice and find the users name and photo from the server*/}
          <p className="text-[#A2AAB8] text-sm font-normal">
            {timeFormat}
            <br />
            {post.isFree ? "Public" : "Subscribers only"}
          </p>
        </div>
      </div>

      <div>
        <Content
          title={post.title}
          contentType={post.contentType}
          contentURL={post.contentURL}
          description={post.description}
        />
      </div>

      <div className="flex flex-row w-full justify-between px-2 items-end">
        <div class="mt-3 flex -space-x-2 overflow-hidden items-center">
          <img
            class="inline-block h-6 w-6 rounded-full ring-1 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            class="inline-block h-6 w-6 rounded-full ring-1  ring-white"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            class="inline-blockh-6 w-6 rounded-full ring-1  ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
          <img
            class="inline-block h-6 w-6 rounded-full ring-1  ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            class="inline-block h-6 w-6 rounded-full ring-1  ring-white"
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>

        <div className="text-[#A2AAB8] text-sm font-normal ">
          {17} comments {5} likes {10} supporters
        </div>
      </div>
    </div>
  );
};

export default Post;
