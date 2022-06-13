import uuid from "react-uuid";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col">
      <div className="self-center w-full">
        {contentType === "image" ? (
          avaliable ? (
            <img src={contentURL} alt="" className="rounded-xl object-cover" />
          ) : (
            <>
              <img
                src={contentURL}
                alt=""
                className="rounded-xl object-cover blur-md"
              />
            </>
          )
        ) : (
          ""
        )}

        {contentType === "video" ? (
          <video width="750" height="500" controls className="rounded-xl ">
            <source src={avaliable ? contentURL : ""} type="video/mp4" />
          </video>
        ) : (
          ""
        )}

        {contentType === "sound" ? (
          <figure className="">
            <audio controls className="w-full">
              <source src={avaliable ? contentURL : ""} type="audio/mpeg" />
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
