import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor={name} className="label-input-msa">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // className="bg-white border border-gray-300 rounded-md w-full p-3 focus:ring-blue-500 focus:border-blue-500"
        className="input input-bordered w-full "
      />
    </div>
  );
};

export default InputField;
