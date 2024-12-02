import React from "react";

const MuatNaikSurat = ({ label }) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="suratMSA" className="label-input-msa">
        {label}
      </label>
      <div className="w-full flex items-center">
        <input
          type="file"
          id="suratMSA"
          name="suratMSA"
          className="file-input file-input-bordered w-1/2"
        />
      </div>
    </div>
  );
};

export default MuatNaikSurat;
