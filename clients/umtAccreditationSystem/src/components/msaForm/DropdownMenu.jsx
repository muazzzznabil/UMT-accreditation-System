import React from "react";

const DropdownMenu = ({
  label,
  options,
  value,
  placeholderOptions,
  onChange,
  labelId,
}) => {
  return (
    <div className="flex items-center w-full">
      <label htmlFor={labelId} className="label-input-msa">
        {label}
      </label>
      <select
        id={labelId}
        name={labelId}
        className="select select-bordered w-full"
        onChange={onChange}
        value={value} // Bind the current selected value
      >
        <option value="" disabled hidden className="text-gray-400">
          {placeholderOptions}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
