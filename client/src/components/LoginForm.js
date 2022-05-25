import { Link } from "react-router-dom";
import FormInputLabel from "./FormInputLabel";
import PrimaryButton from "./PrimaryButton";

const LoginForm = () => {
  return (
    <div className="px-8 py-9 flex flex-col mx-2 sm:mx-16 my-20 lg:mx-0 font-sans border border-[#878787] border-[0.5px] rounded-lg shadow-xl">
      <p className="font-light text-2xl py-9">Welcome!</p>
      <p className="signin pb-8 font-medium text-3xl">Sign In</p>
      <form>
        <FormInputLabel
          inputId={"email"}
          inputType={"email"}
          label=" Email"
          placeholder="Please enter your email"
        />
        <FormInputLabel
          inputId={"password"}
          inputType={"password"}
          label="Password"
          placeholder="Please enter your password"
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

        <PrimaryButton text="Giriş Yap" witdh="w-full" />

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
