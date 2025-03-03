import dayjs from "dayjs";
import React from "react";
import { FieldValue, UseFormRegister } from "react-hook-form";

interface DatePickerProps {
  name: string;
  label: string;
  // dateValue?: Date;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  register: UseFormRegister<FieldValue>;
  defValue?: Date;
  placeholder?: string;
}

const DateUpdate = ({
  name,
  label,
  onChange,
  register,
  defValue,
  placeholder,
}: DatePickerProps) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor={name} className="label-input-msa">
        {label}
      </label>
      <div className="w-full">
        <input
          type="date"
          required
          id={name}
          placeholder={placeholder}
          {...register(name)}
          onChange={onChange}
          defaultValue={
            dayjs(defValue).format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD")
          }
          className="p-2 h-12 rounded-lg border w-full"
        />
      </div>
    </div>
  );
};

export default DateUpdate;
