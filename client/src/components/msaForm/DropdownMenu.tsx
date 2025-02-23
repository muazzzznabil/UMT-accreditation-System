import React, { FC } from "react";

interface DropdownMenuProps {
  label: string;
  options: string[];
  value: string;
  placeholderOptions: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  labelId: string;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
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
        required
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
