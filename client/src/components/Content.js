import uuid from "react-uuid";
import Tag from "./Tag";
import { Link } from "react-router-dom";

function Content({
  contentURL,
  contentType,
  title,
  description,
  tags,
  id,
  avaliable,
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="self-center w-full ">
        {contentType === "image" ? (
          avaliable ? (
            <div className="flex justify-center">
              <img
                src={contentURL}
                alt=""
                className="rounded-xl object-cover "
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={contentURL}
                alt=""
                className="rounded-xl object-cover blur-md "
              />
            </div>
          )
        ) : (
          ""
        )}

        {contentType === "video" ? (
          <video
            width="750"
            height="500"
            controls
            className={`rounded-xl ${
              avaliable ? "" : "blur-md pointer-events-none"
            } `}
          >
            <source src={contentURL} type="video/mp4" />
          </video>
        ) : (
          ""
        )}

        {contentType === "sound" ? (
          <figure className="">
            <audio
              controls
              className={`w-full ${avaliable ? "" : "pointer-events-none"}`}
            >
              <source src={contentURL} type="audio/mpeg" />
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
          contentType === "text" && !avaliable ? (
            <>
              <div className="p-2 rounded-lg ">
                {description.substring(0, description.length / 2)}...
              </div>
            </>
          ) : (
            <div className="p-2 rounded-lg ">{description}</div>
          )
        ) : (
          ""
        )}
        <div className="my-2">
          {tags.map((tag) => {
            return <Tag key={uuid()} tag={tag} />;
          })}
        </div>
      </Link>
      {avaliable ? (
        ""
      ) : (
        <p className="mt-4 text-center ">Purchase this content to unlock</p>
      )}
    </div>
  );
}

export default Content;
