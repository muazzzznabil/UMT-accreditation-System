// import React, { useState } from "react";
import PropTypes from "prop-types";
const DatePicker = ({ name, label, onChange }) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor={name} className="label-input-msa">
        {label}
      </label>
      <div className="w-full">
        <input
          type="date"
          id={name}
          name={name}
          onChange={onChange}
          className="p-2 h-12 rounded-lg border w-full "
        />
      </div>
    </div>
  );
};
// Add PropTypes validation
DatePicker.propTypes = {
  name: PropTypes.string.isRequired, // 'name' should be a string and is required
  label: PropTypes.string.isRequired, // 'label' should be a string and is required
  onChange: PropTypes.func.isRequired, // 'onChange' should be a function and is required
};
export default DatePicker;
