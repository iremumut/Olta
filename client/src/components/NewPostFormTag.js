const NewPostFormTag = ({ tag, removeTag }) => {
  return (
    <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2 ">
      # {tag}
      <button className="text-right ml-6" onClick={() => removeTag(tag)}>
        X
      </button>
    </p>
  );
};

export default NewPostFormTag;
