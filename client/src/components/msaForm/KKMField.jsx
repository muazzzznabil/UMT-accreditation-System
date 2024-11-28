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
          <option value="">Tahap 8</option>
          <option value="">Tahap 7</option>
          <option value="">Tahap 6</option>
          <option value="">Tahap 5</option>
          <option value="">Tahap 4</option>
          <option value="">Tahap 3</option>
          <option value="">Tahap 2</option>
          <option value="">Tahap 1</option>
        </select>
      </div>
    </div>
  );
};

export default KKMField;
