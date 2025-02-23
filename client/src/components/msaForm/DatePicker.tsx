import React from "react";

interface DatePickerProps {
  name: string;
  label: string;
  // dateValue?: Date;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const DatePicker = ({ name, label, onChange }: DatePickerProps) => {
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
          name={name}
          // value={dateValue}
          onChange={onChange}
          className="p-2 h-12 rounded-lg border w-full"
        />
      </div>
    </div>
  );
};

export default DatePicker;
