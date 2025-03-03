/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface DropdownMenuProps {
  label: string;
  options: string[];
  value?: string;
  placeholderOptions: string;
  //   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  labelId: string;
  defaultValue?: string;
  register: UseFormRegister<any>;
}

const DropdownUpdate: FC<DropdownMenuProps> = ({
  label,
  options,
  value,
  placeholderOptions,
  labelId,
  defaultValue,
  register,
}) => {
  return (
    <div className="flex items-center w-full">
      <label htmlFor={labelId} className="label-input-msa">
        {label}
      </label>
      <select
        id={labelId}
        required
        className="select select-bordered w-full"
        value={value} // Bind the current selected value
        defaultValue={defaultValue}
        {...register(labelId)}
      >
        <option value="placeholder" disabled hidden className="text-gray-400">
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

export default DropdownUpdate;
