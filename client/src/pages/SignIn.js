import image from "../assets/images/small-team-discussing-ideas.png";

import SignInForm from "../components/SignInForm";
const SignIn = () => {
  return (
    <div className="flex flex-row justify-evenly">
      <div className="">
        <SignInForm />
      </div>
      <div className="">
        <img src={image} alt="small-team-discussing-ideas" />
      </div>
    </div>
  );
};

export default SignIn;
