import { useState } from "react";
import passwordVector from "../assets/vectors/passwordHide.svg";

const FormInputLabel = ({
  inputType,
  label,
  inputId,
  placeholder,
  value,
  HandleChange,
}) => {
  const [type, setType] = useState(inputType);

  const changeVisibility = (e) => {
    e.preventDefault();
    setType((prev) => {
      if (prev === "password") {
        setType("text");
      } else {
        setType("password");
      }
    });
  };
  return (
    <div className="flex flex-col py-3">
      <label htmlFor="name" className="text-base py-2 font-medium">
        {label}
      </label>
      <div className="lg:w-96 w-90 border border-[#282828] border-solid border-[0.6px] rounded-md h-14 ">
        <input
          type={type}
          name={inputId}
          id={inputId}
          className="w-10/12 sm:w-11/12 border-none rounded-md h-full bg-inherit focus:outline-none py-2 px-4 "
          placeholder={placeholder}
          value={value}
          onChange={HandleChange}
        />
        {inputType === "password" ? (
          <button onClick={changeVisibility}>
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
