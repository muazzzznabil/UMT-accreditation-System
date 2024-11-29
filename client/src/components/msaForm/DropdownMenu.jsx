import React from "react";

const DropdownMenu = ({
  label,
  options,
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
        id={labelId} // Create a unique id from the label the example is "Code NEC" will be "code-nec"
        className="select select-bordered w-full"
        onChange={onChange} // Handle change event
      >
        <option value="" disabled selected hidden className="text-gray-400 ">
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
