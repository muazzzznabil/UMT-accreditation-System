/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface DropdownMenuProps {
  label: string;
  options: string[];
  value?: string;
  placeholderOptions: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  labelId: string;
  defaultValue?: string;
  register: UseFormRegister<any>;
  className?: string;
  classDiv?: string;
}

const DropdownUpdate: FC<DropdownMenuProps> = ({
  label,
  options,
  value,
  placeholderOptions,
  labelId,
  defaultValue,
  register,
  className,
  onChange,
}) => {
  return (
    <div className={`flex  items-center w-full`}>
      <label htmlFor={labelId} className="label-input-msa">
        {label}
      </label>
      <div className="w-full">
        <select
          id={labelId}
          className={`select  select-bordered  ${
            className ? className : "w-full"
          }`}
          value={value} // Bind the current selected value
          required
          defaultValue={defaultValue}
          {...register(labelId, { required: true })}
          onChange={onChange}
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
    </div>
  );
};

export default DropdownUpdate;
