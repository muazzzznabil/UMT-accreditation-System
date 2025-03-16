/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import React from "react";
import { UseFormRegister } from "react-hook-form";

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
}: DatePickerProps) => {
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
            className="p-2 h-12 rounded-lg border w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DateUpdate;
