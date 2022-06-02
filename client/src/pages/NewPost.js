import video from "../assets/vectors/video.svg";
import text from "../assets/vectors/text.svg";
import image from "../assets/vectors/image.svg";
import sound from "../assets/vectors/sound.svg";

import "./NewPost.css";

import FileUpload from "../components/FileUpload";
import TextContentUpload from "../components/TextContentUpload";

import { useEffect, useState } from "react";
import NewPostFormTag from "../components/NewPostFormTag";

import uuid from "react-uuid";
import { createPost, reset } from "../features/posts/postSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const buttonsInital = {
  video: false,
  image: false,
  text: false,
  sound: false,
};

const NewPost = () => {
  const { isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.post
  );

  const [buttons, setButtons] = useState({ ...buttonsInital, text: true });

  const [fileUpload, setFileUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: "",
  });
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);

  const [contentType, setContentType] = useState("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagsChange = (e) => {
    if (e.key === "Enter") {
      setTags((prev) => [...prev, e.target.value]);
      setTag("");
    }
  };

  const handleChangeOnTag = (e) => {
    setTag(e.target.value);
  };

  const handleFormChange = (e) => {
    if (e.target.name === "file") {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const removeTag = (tagToRemove) => {
    const newArr = tags.filter((tag) => {
      return tag !== tagToRemove;
    });
    setTags(newArr);
  };

  const pickComponent = (number) => {
    switch (number) {
      case 1:
        setButtons({ ...buttonsInital, video: true });
        setFileUpload(true);
        setContentType("video");
        break;
      case 2:
        setButtons({ ...buttonsInital, image: true });
        setFileUpload(true);
        setContentType("image");
        break;
      case 3:
        setButtons({ ...buttonsInital, text: true });
        setFileUpload(false);
        setContentType("text");
        break;
      case 4:
        setButtons({ ...buttonsInital, sound: true });
        setFileUpload(true);
        setContentType("sound");
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: formData.title,
      description: formData.description,
      contentType: contentType,
      price: price,
      isFree: isFree,
    };
    //console.log(post);
    const formdata = new FormData();
    formdata.append("file", formData.file);
    formdata.append("title", post.title);
    formdata.append("description", post.description);
    formdata.append("contentType", post.contentType);
    formdata.append("tags", JSON.stringify(tags));
    formdata.append("price", post.price);
    formdata.append("isFree", post.isFree);
    //tags.forEach((item) => formData.append("tags[]", item))

    //console.log(post);
    dispatch(createPost(formdata));
  };

  useEffect(() => {
    if (isError) {
      console.log("error here");
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Content is posted!");
      dispatch(reset);
      navigate("/");
    }
  }, [isError, isSuccess, navigate, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background flex flex-row ">
      <div className="rounded-xl flex flex-col bg-white xl:w-1/2 lg:w-3/4 mx-4 my-4 w-full 2xl:mx-20 2xl:my-10">
        <div className="flex flex-row justify-center items-center ">
          <button
            onClick={() => pickComponent(1)}
            className={`basis-1/4 p-4 border-r border-b-2 border-slate-200 ${
              buttons.video ? "border-b-[#4E8BFF]" : ""
            }`}
          >
            <img
              src={video}
              alt=""
              className={`inline ${buttons.video ? "turn-button-blue" : " "}`}
            />
          </button>
          <button
            onClick={() => pickComponent(2)}
            className={`basis-1/4 p-4 border-r border-b-2 border-slate-200 ${
              buttons.image ? "border-b-[#4E8BFF]" : ""
            }`}
          >
            <img
              src={image}
              alt=""
              className={`inline ${buttons.image ? "turn-button-blue" : " "}`}
            />
          </button>
          <button
            onClick={() => pickComponent(3)}
            className={`basis-1/4 p-4 border-r border-b-2 border-slate-200 ${
              buttons.text ? "border-b-[#4E8BFF]" : ""
            }`}
          >
            <img
              src={text}
              alt=""
              className={`inline ${buttons.text ? "turn-button-blue" : " "}`}
            />
          </button>
          <button
            onClick={() => pickComponent(4)}
            className={`basis-1/4 p-4 border-r border-b-2 border-slate-200 ${
              buttons.sound ? "border-b-[#4E8BFF]" : ""
            }`}
          >
            <img
              src={sound}
              alt=""
              className={`inline ${buttons.sound ? "turn-button-blue" : " "}`}
            />
          </button>
        </div>

        {/* Post upload part */}
        <div className="p-6 px-14">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center py-4 pb-6 ">
              <img
                className="h-14 w-14 rounded-full mr-3 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
                alt=""
              />
              <p className="font-semibold text-xl text-[#4E5D78]">Alex Ryan</p>
            </div>

            <div className="my-4">
              <input
                className="bg-[#F6F7F8] w-full rounded-xl h-10 focus:outline-none px-4"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </div>

            {fileUpload ? (
              <FileUpload
                valueDesc={formData.description}
                valueFilepath={formData.filepath}
                handleChange={handleFormChange}
              />
            ) : (
              <TextContentUpload
                valueDesc={formData.description}
                handleChange={handleFormChange}
              />
            )}
          </form>

          {/* Tags upload part */}
          <div className="my-4 mb-8">
            <input
              className="bg-[#F6F7F8]  rounded-xl h-10 focus:outline-none px-4"
              placeholder="Tags"
              onKeyPress={handleTagsChange}
              value={tag}
              onChange={handleChangeOnTag}
            />
          </div>

          <hr />

          {/* Tags show part */}
          <div className="my-8 mt-9">
            {tags.map((tag) => {
              return (
                <NewPostFormTag key={uuid()} tag={tag} removeTag={removeTag} />
              );
            })}
          </div>

          <hr className={`${tags.length === 0 ? "hidden" : ""}`} />

          <div className="flex flex-row my-4 ">
            <button
              onClick={() => setIsFree(true)}
              className={`bg-[#F6F7F8] text-[#A2AAB8] rounded-3xl px-6 py-2 w-full mr-4 hover:border hover:border-[#4E8BFF] hover:text-[#4E8BFF] ${
                isFree ? "border border-[#4E8BFF] text-[#4E8BFF]" : ""
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setIsFree(false)}
              className={`bg-[#F6F7F8] text-[#A2AAB8] rounded-3xl px-6 py-2 w-full mr-4 hover:border hover:border-[#4E8BFF] hover:text-[#4E8BFF] ${
                !isFree ? "border border-[#4E8BFF] text-[#4E8BFF]" : ""
              }`}
            >
              Subscribers Only
            </button>
          </div>

          <div
            className={`flex flex-row justify-center my-2 ${
              isFree ? "hidden" : ""
            }`}
          >
            <div className="border border-[#4E8BFF] flex flex-col lg:w-1/2 w-3/4 items-center p-2 rounded-xl ">
              <div className="text-[#4E8BFF] pb-4 pt-2">Pricing</div>
              <div className=" flex flex-row justify-center w-4/5">
                <button
                  onClick={() => setPrice((prev) => prev + 1)}
                  className="bg-[#4E8BFF] xsm:px-6 px-2 py-1 text-white rounded-l-lg text-4xl font-extralight"
                >
                  +
                </button>
                <div className="p-1 xsm:px-6 px-2 items-center flex flex-col bg-[#4E8BFF] text-white border-x-2 border-white ">
                  <div>{price}</div>
                  <div>$</div>
                </div>
                <button
                  onClick={() => setPrice((prev) => prev - 1)}
                  className="bg-[#4E8BFF] xsm:px-6 px-2 py-1 text-white rounded-r-lg text-4xl font-extralight"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center mt-10 yb-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#4E8BFF] text-white rounded-full px-8 py-4 w-full hover:bg-[#4E8BFF]/70"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

/*
<div className="mt-64  ">
          <img src={createPostImg} alt="Create Post" />
        </div>*/
//invert-[.44] sepia-[.87] saturate-[13.13] hue-rotate-[201deg] brightness-100 contrast-[1.03]
