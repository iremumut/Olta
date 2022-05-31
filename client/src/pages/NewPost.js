import video from "../assets/vectors/video.svg";
import text from "../assets/vectors/text.svg";
import image from "../assets/vectors/image.svg";
import sound from "../assets/vectors/sound.svg";
//import createPostImg from "../assets/images/create-post.png";

const NewPost = () => {
  return (
    <>
      <div className=" rounded-xl flex flex-col bg-white w-3/6">
        <div className="flex flex-row justify-center items-center ">
          <button className="basis-1/4 p-4 border-r border-b border-slate-200 ">
            <img src={video} alt="" className="inline" />
          </button>
          <button className="basis-1/4 p-4 border-r border-b border-slate-200">
            <img src={image} alt="" className="inline" />
          </button>
          <button className="basis-1/4 p-4 border-r border-b border-slate-200">
            <img src={text} alt="" className="inline" />
          </button>
          <button className="basis-1/4  p-4 border-b border-slate-200">
            <img src={sound} alt="" className="inline" />
          </button>
        </div>

        <div className="p-6 px-14">
          <div className="flex flex-row items-center py-8 pb-12 ">
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
            />
          </div>

          <div className="my-4">
            <textarea
              className="resize-none bg-[#F6F7F8] w-full rounded-xl focus:outline-none p-4 h-72"
              placeholder="Description"
            />
          </div>

          <div className="my-4 mb-8">
            <input
              className="bg-[#F6F7F8]  rounded-xl h-10 focus:outline-none px-4"
              placeholder="Tags"
            />
          </div>

          <hr />

          <div className="my-8 mt-9">
            <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2">
              # Friday
            </p>
            <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2">
              # Friday
            </p>
            <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2">
              # Friday
            </p>
            <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2">
              # Friday
            </p>
            <p className="bg-[#4E8BFF] px-6 py-2 inline-block rounded-3xl text-white mr-2 mb-2">
              # Friday
            </p>
          </div>

          <hr />

          <div className="flex flex-row my-4 ">
            <button className="bg-[#F6F7F8] text-[#A2AAB8] rounded-3xl px-6 py-2 w-full mr-4 hover:border hover:border-[#4E8BFF] hover:text-[#4E8BFF] focus:border focus:border-[#4E8BFF] focus:text-[#4E8BFF]">
              Public
            </button>
            <button className="bg-[#F6F7F8] text-[#A2AAB8] rounded-3xl px-6 py-2 w-full mr-4 hover:border hover:border-[#4E8BFF] hover:text-[#4E8BFF]  focus:border  focus:border-[#4E8BFF] focus:text-[#4E8BFF]">
              Subscribers Only
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;

/*
<div className="mt-64  ">
          <img src={createPostImg} alt="Create Post" />
        </div>*/
