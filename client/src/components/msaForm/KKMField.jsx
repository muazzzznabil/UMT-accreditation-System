import React from "react";

const KKMField = () => {
  return (
    <div className="flex w-full ">
      <label className="text-lg text-gray-700 mb-2  font-bold w-1/4">
        Tahap KKM
      </label>
      <div className="w-full">
        <select
          name="tahapKKM"
          id="tahapKKM"
          className="select select-bordered w-1/5"
        >
          <option
            value=""
            disabled
            selected
            hidden
            className="text-gray-400 selection:text-gray-400"
          >
            Sila Pilih Tahap KKM
          </option>
          <option value="8">Tahap 8</option>
          <option value="7">Tahap 7</option>
          <option value="6">Tahap 6</option>
          <option value="5">Tahap 5</option>
          <option value="4">Tahap 4</option>
          <option value="3">Tahap 3</option>
          <option value="2">Tahap 2</option>
          <option value="1">Tahap 1</option>
        </select>
      </div>
    </div>
  );
};

export default KKMField;
