import { useState } from "react";
import passwordVector from "../assets/vectors/passwordHide.svg";

const FormInputLabel = ({
  inputType,
  label,
  inputName,
  inputId,
  placeholder,
}) => {
  const [type, setType] = useState(inputType);

  const changeVisibility = (e) => {
    e.preventDefault();
    setType((prev) => {
      if(prev === "password"){
        setType("text");
      }else{
        setType("password");
      }
    })
  }
  return (
    <div className="flex flex-col py-5">
      <label htmlFor="name" className="text-base py-2 font-medium">
        {label}
      </label>
      <div className="w-96 border border-[#282828] border-solid border-[0.6px] rounded-md h-14 ">
        <input
          type={type}
          name={inputName}
          id={inputId}
          className="w-11/12 border-none rounded-md h-full bg-inherit focus:outline-none py-2 px-4 "
          placeholder={placeholder}
        />
        {inputType === "password" ? (
          <button  onClick={changeVisibility}>
            {" "}
            <img src={passwordVector} alt="show password" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FormInputLabel;
