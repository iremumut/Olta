import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

import FormInputLabel from "./FormInputLabel";
import PrimaryButton from "./PrimaryButton";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    //dispatch(logout());
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
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
    } else {
      const user = {
        ...formData,
      };

      dispatch(login(user));

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 py-9 flex flex-col mx-2 sm:mx-16 my-20 lg:mx-0 border border-[#878787] border-[0.5px] rounded-lg shadow-xl">
      <p className="font-light text-2xl py-9">Welcome!</p>
      <p className="signin pb-8 font-medium text-3xl">Sign In</p>
      <form onSubmit={HandleSubmit}>
        <FormInputLabel
          inputId={"email"}
          inputType={"email"}
          label=" Email"
          placeholder="Please enter your email"
          value={formData.email}
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

        <div className="flex flex-row justify-between pb-9">
          <div className="flex align-center">
            <input type="checkbox" className="w-4 h-4" />
            <p className="inline px-2 text-xs text-slate-500">Remember me</p>
          </div>
          <Link to="/">
            <p className="text-xs text-slate-500">Forgot password</p>
          </Link>
        </div>

        <PrimaryButton text="Sign in" witdh="w-full" />

        <p className="text-center mt-9 text-slate-500 text-base">
          Do not have an account?
          <Link to={"/register"} className="text-black font-bold">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
