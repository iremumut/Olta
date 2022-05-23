import React from 'react';
import {Link} from "react-router-dom";

import FormInputLabel from './FormInputLabel';
import PrimaryButton from './PrimaryButton';

function SignUpForm() {
    return (
    <div className="px-8 py-9 flex flex-col mx-2 sm:mx-16 my-20 lg:mx-0 font-sans border border-[#878787] border-[0.5px] rounded-lg shadow-xl">
      <p className="font-light text-2xl py-9">Welcome!</p>
      <p className="signin pb-8 font-medium text-3xl">Sign Up</p>
      <form>
          <FormInputLabel
          inputId={"email"}
          inputType={"email"}
          label="Email"
          placeholder="Please enter your email"
        />
        <FormInputLabel
          inputId={"name"}
          inputType={"text"}
          label="Name"
          placeholder="Please enter your name"
        />
        <FormInputLabel
          inputId={"username"}
          inputType={"text"}
          label="Username"
          placeholder="@ Please enter your username"
        />
        <FormInputLabel
          inputId={"password"}
          inputType={"password"}
          label="Password"
          placeholder="Please enter your password"
        />
        <FormInputLabel
          inputId={"passwordConfirm"}
          inputType={"password"}
          label="Confirm Password"
          placeholder="Please enter your password again"
        />

        <PrimaryButton text="Sign Up" witdh="w-full"/>
        
        <p className="text-center mt-9 text-slate-500 text-base" >
          Already have an account?
          <Link to={"/signin"} className="text-black font-bold"> Sign In</Link>
        </p>
      </form>
    </div>
    );
}

export default SignUpForm;