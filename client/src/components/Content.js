import uuid from "react-uuid";
import Tag from "./Tag";
import { Link } from "react-router-dom";

function Content({ contentURL, contentType, title, description, tags, id }) {
  return (
    <div className="flex flex-col">
      <div className="self-center">
        {contentType === "image" ? (
          <img src={contentURL} alt="" className="rounded-xl object-cover" />
        ) : (
          ""
        )}

        {contentType === "video" ? (
          <video width="750" height="500" controls className="rounded-xl">
            <source src={contentURL} type="video/mp4" />
          </video>
        ) : (
          ""
        )}

        {contentType === "sound" ? (
          <figure>
            <audio controls src={contentURL} className="w-full ">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        ) : (
          ""
        )}
      </div>
      <Link to={`/posts/${id}`}>
        <p className="capitalize text-lg font-semibold text-[#4E5D78] mt-4 p-1">
          {title}
        </p>
        {description ? (
          <div className="p-2 rounded-lg ">{description}</div>
        ) : (
          ""
        )}
        <div className="my-2">
          {tags.map((tag) => {
            return <Tag key={uuid()} tag={tag} />;
          })}
        </div>
      </Link>
    </div>
  );
}

export default Content;
