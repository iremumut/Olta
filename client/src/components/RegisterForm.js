import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

import FormInputLabel from "./FormInputLabel";
import PrimaryButton from "./PrimaryButton";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      //if its succesful or ther is already a user logged in
      console.log(user);
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const HandleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (!validateEmail(formData.email)) {
      error = true;
      toast.error("Please enter a valid email address");
    }

    if (formData.password !== formData.confirmPassword) {
      error = true;
      toast.error("Passwords do not match");
    }

    if (!error) {
      const user = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      dispatch(register(user));
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 py-9 flex flex-col mx-2 sm:mx-16 my-20 lg:mx-0 font-sans border border-[#878787] border-[0.5px] rounded-lg shadow-xl">
      <p className="font-light text-2xl py-9">Welcome!</p>
      <p className="signin pb-8 font-medium text-3xl">Sign Up</p>
      <form onSubmit={HandleSubmit}>
        <FormInputLabel
          inputId={"email"}
          inputType={"email"}
          label="Email"
          placeholder="Please enter your email"
          value={formData.email}
          HandleChange={HandleChange}
        />
        <FormInputLabel
          inputId={"name"}
          inputType={"text"}
          label="Name"
          placeholder="Please enter your name"
          value={formData.name}
          HandleChange={HandleChange}
        />
        <FormInputLabel
          inputId={"username"}
          inputType={"text"}
          label="Username"
          placeholder="@ Please enter your username"
          value={formData.username}
          HandleChange={HandleChange}
        />
        <FormInputLabel
          inputId={"password"}
          inputType={"password"}
          label="Password"
          placeholder="Please enter your password"
          value={formData.password}
          HandleChange={HandleChange}
        />
        <FormInputLabel
          inputId={"confirmPassword"}
          inputType={"password"}
          label="Confirm Password"
          placeholder="Please enter your password again"
          value={formData.confirmPassword}
          HandleChange={HandleChange}
        />

        <PrimaryButton text="Sign Up" witdh="w-full" />

        <p className="text-center mt-9 text-slate-500 text-base">
          Already have an account?
          <Link to={"/login"} className="text-black font-bold">
            {" "}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
