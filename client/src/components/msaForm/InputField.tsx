import React, { FC } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
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
        required
        // className="bg-white border border-gray-300 rounded-md w-full p-3 focus:ring-blue-500 focus:border-blue-500"
        className="input input-bordered w-full "
      />
    </div>
  );
};

export default InputField;
