import React from "react";
type props = {
  id: string;
  placeholder: string;
  type: string;
  value: string;
  handleOwl?: any;
  data: object;
  setData: any;
};

const InputField = ({
  id,
  placeholder,
  type,
  handleOwl,
  value,
  data,
  setData,
}: props) => {
  const clicked = (e: any) => {
    if (type === "password") {
      handleOwl();
    }
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full relative mb-5">
      <label htmlFor={id} className="hidden"></label>
      <input
        className="px-2.5 h-12 rounded w-full text-sm font-light focus:outline-none
       placeholder:text-gray-200"
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        defaultValue={value}
        onFocus={clicked}
        onBlur={clicked}
        onChange={handleChange}
        autoComplete="off"
        required
      ></input>
    </div>
  );
};

export default InputField;
