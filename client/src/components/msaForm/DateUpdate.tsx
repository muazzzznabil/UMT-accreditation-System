/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { useThemeStore } from "../../utils/useThemeStore";

interface DatePickerProps {
  name: string;
  label: string;
  // dateValue?: Date;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register: UseFormRegister<any>;
  defValue?: Date;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

const DateUpdate = ({
  name,
  label,
  onChange,
  register,
  defValue,
  required,
  placeholder,
  className,
  inputClassName,
}: DatePickerProps) => {
  const { darkMode } = useThemeStore();

  return (
    <div className={`flex mb-4 items-center ${className}`}>
      <label htmlFor={name} className="label-input-msa">
        {label}
      </label>
      <div className="w-full">
        <div className="flex flex-col ">
          <input
            type="date"
            id={name}
            placeholder={placeholder}
            {...register(name, { required: required })}
            onChange={onChange}
            defaultValue={
              dayjs(defValue).format("YYYY-MM-DD") ||
              dayjs().format("YYYY-MM-DD")
            }
            className={`${inputClassName} p-2  rounded ${
              darkMode ? "bg-base-200" : "bg-white"
            } w-1/2 ring-1 ring-gray-400`}
            // className={`datetime-local `}
          />
        </div>
      </div>
    </div>
  );
};

export default DateUpdate;
