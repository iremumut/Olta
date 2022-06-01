const FileUpload = ({ valueDesc, handleChange, valueFilepath }) => {
  return (
    <div className="my-4">
      <div className="flex flex-row justify-center bg-[#F6F7F8] w-full rounded-t-lg p-4 h-72 items-center">
        <label
          htmlFor="uploadFile"
          className="bg-[#4E8BFF] text-white rounded-full py-4 px-20 "
        >
          Upload
        </label>
      </div>
      <input
        type="file"
        name="filepath"
        onChange={handleChange}
        id="uploadFile"
        className="opacity-0 hidden"
      />
      <textarea
        className="resize-none bg-[#F6F7F8] w-full rounded-b-lg border-t-2 focus:outline-none p-4 h-28"
        placeholder="Description"
        name="description"
        value={valueDesc}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;
