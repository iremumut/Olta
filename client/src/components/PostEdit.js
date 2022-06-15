import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import ethereum from "../assets/vectors/ethereum.svg";
import { updatePost } from "../features/posts/postSlice";
import NewPostFormTag from "./NewPostFormTag";

const PostEdit = () => {
  const { postid } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { isLoading: postLoading } = useSelector((state) => state.post);

  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0.0);

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const removeTag = (tagToRemove) => {
    const newArr = tags.filter((tag) => {
      return tag !== tagToRemove;
    });
    setTags(newArr);
  };

  const handleTagsChange = (e) => {
    if (e.key === "Enter") {
      setTags((prev) => [...prev, e.target.value]);
      setTag("");
    }
  };

  const handleChangeOnTag = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: post._id,
      title: formData.title,
      description: formData.description,
      price: price,
      isFree: isFree,
      tags: [...tags],
    };
    console.log(newPost);
    Promise.all([dispatch(updatePost(newPost))]).then((res) => {
      if (res[0].error) {
        toast.error(res[0].payload);
      } else {
        toast.success("Updated post!");
        navigate(`/posts/${post._id}`);
      }
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get(`http://localhost:5000/posts/${postid}`, config)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            setPost(res.data);
            setFormData({
              title: res.data.title,
              description: res.data.description,
            });
            setPrice(res.data.price);
            setTags([...res.data.tags]);
            if (res.data.isFree) {
              setIsFree(true);
            } else {
              setIsFree(false);
            }
          }
          setIsLoading(false);
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    };
    fetchPost();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (post.length !== 0 && post.creator !== user._id) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [post, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (postLoading) {
    return <p>Updating post...</p>;
  }

  return (
    <div className="flex flex-row justify-center ">
      <div className="2xl:w-1/2 lg:w-2/3 w-full lg:mx-0 mx-4">
        {post.length !== 0 ? (
          <>
            <div className=" bg-white  md:p-4 md:px-10 p-4 my-6 flex flex-col rounded-lg">
              <div className="flex flex-row py-4 justify-start">
                <Link to="/users/me/posts">
                  <img
                    className="h-16 w-16 rounded-full mr-3 "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
                    alt=""
                  />
                </Link>
                <div>
                  <Link to="/users/me/posts">
                    <p className="text-[#4E5D78] text-base font-medium capitalize">
                      {user && user.name ? user.name : "User"}
                    </p>{" "}
                  </Link>
                  {/*@TODO create user slice and find the users name and photo from the server*/}
                  <p className="text-[#A2AAB8] text-sm font-normal">
                    {moment(post.createdAt).startOf("hour").fromNow()}
                    <br />
                    {post.isFree ? "Public" : "Subscribers only"}
                  </p>
                </div>
                <div className="ml-auto text-[#4E8BFF] flex items-center">
                  {post.updated ? "Edited" : ""}
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="self-center w-full ">
                  {post.contentType === "image" ? (
                    <div className="flex justify-center">
                      <img
                        src={post.contentURL}
                        alt=""
                        className="rounded-xl object-cover "
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {post.contentType === "video" ? (
                    <video
                      width="750"
                      height="500"
                      controls
                      className="rounded-xl"
                    >
                      <source src={post.contentURL} type="video/mp4" />
                    </video>
                  ) : (
                    ""
                  )}

                  {post.contentType === "sound" ? (
                    <figure className="">
                      <audio controls className="w-full">
                        <source src={post.contentURL} type="audio/mpeg" />
                        Your browser does not support the
                        <code>audio</code> element.
                      </audio>
                    </figure>
                  ) : (
                    ""
                  )}
                </div>

                <form className="w-full">
                  <div className="my-4">
                    <input
                      className="bg-[#F6F7F8] w-full rounded-xl h-10 focus:outline-none px-4"
                      placeholder="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="my-4">
                    <textarea
                      className="resize-none bg-[#F6F7F8] w-full rounded-xl focus:outline-none p-4 h-72"
                      placeholder="Please enter the description here"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-row my-4 ">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsFree(true);
                      }}
                      className={`bg-[#F6F7F8] text-[#A2AAB8] rounded-3xl px-6 py-2 w-full mr-4 hover:border hover:border-[#4E8BFF] hover:text-[#4E8BFF] ${
                        isFree ? "border border-[#4E8BFF] text-[#4E8BFF]" : ""
                      }`}
                    >
                      Public
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsFree(false);
                      }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            setPrice((prev) => prev + 0.001);
                          }}
                          className="bg-[#4E8BFF] xsm:px-6 px-2 py-1 text-white rounded-l-lg text-4xl font-extralight"
                        >
                          +
                        </button>
                        <div className="p-1 xsm:px-6 px-2 items-center flex flex-col bg-[#4E8BFF] text-white border-x-2 border-white ">
                          <div>{price}</div>
                          <img
                            className="inline h-8 w-8"
                            src={ethereum}
                            alt=""
                          />
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (price !== 0) {
                              setPrice((prev) => prev - 0.001);
                            }
                          }}
                          className="bg-[#4E8BFF] xsm:px-6 px-2 py-1 text-white rounded-r-lg text-4xl font-extralight"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <hr className="mb-2 mt-6" />
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
                    <NewPostFormTag
                      key={uuid()}
                      tag={tag}
                      removeTag={removeTag}
                    />
                  );
                })}
              </div>

              <div className="flex flex-row justify-center my-4 yb-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-[#4E8BFF] text-white rounded-full px-8 py-4 w-full hover:bg-[#4E8BFF]/70"
                >
                  Update
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Post not found</p>
        )}
      </div>
    </div>
  );
};

export default PostEdit;
