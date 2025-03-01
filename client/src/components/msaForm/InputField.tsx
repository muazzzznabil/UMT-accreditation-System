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
  // Add this line
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
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default InputField;
