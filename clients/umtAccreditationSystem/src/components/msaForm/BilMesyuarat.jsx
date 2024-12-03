import React from "react";

const BilMesyuarat = () => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="bilMesyuarat" className="label-input-msa">
        Bil Mesyuarat
      </label>
      <div className="w-full flex items-center ">
        <input
          type="text"
          id="bilMesyuarat"
          name="bilMesyuarat"
          className="input input-bordered w-1/6"
          placeholder=" Bil. / Tahun"
        />
      </div>
    </div>
  );
};

export default BilMesyuarat;
