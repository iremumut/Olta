function Content({ contentURL, contentType, title, description }) {
  return (
    <div>
      {contentType === "image" ? (
        <img src={contentURL} alt="" className="" />
      ) : (
        ""
      )}
      <p className="capitalize text-lg font-semibold text-[#4E5D78] py-2">
        {title}
      </p>
      <div className="p-2 rounded-lg border py-4">{description}</div>
    </div>
  );
}

export default Content;
