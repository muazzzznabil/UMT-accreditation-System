import React from "react";

const ProgramKerjasama = () => {
  return (
    <div className="flex w-full ">
      <label className="text-lg text-gray-700 mb-2  font-bold w-1/4">
        Program Kerjasama
      </label>
      <div className="w-full">
        <select
          name="tahapKKM"
          id="tahapKKM"
          className="select select-bordered w-1/5"
        >
          <option value="True">Ya</option>
          <option value="False">Tidak </option>
        </select>
      </div>
    </div>
  );
};

export default ProgramKerjasama;
