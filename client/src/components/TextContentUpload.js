const TextContentUpload = ({ valueDesc, handleChange }) => {
  return (
    <div className="my-4">
      <textarea
        className="resize-none bg-[#F6F7F8] w-full rounded-xl focus:outline-none p-4 h-72"
        placeholder="Please enter the text here"
        name="description"
        value={valueDesc}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextContentUpload;
