import React from "react";
import DatePicker from "./DatePicker";
import BilMesyuarat from "./BilMesyuarat";
import MuatNaikSurat from "./MuatNaikSurat";

const MesyJKA = () => {
  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <DatePicker label={"Tarikh Mesyuarat"} name={"tarikhMesyuarat"} />
      <BilMesyuarat />
      <MuatNaikSurat label={"Minit  JKA"} />

      <div className="flex space-x-4 justify-end">
        <input
          type="reset"
          value="Reset"
          className="btn btn-error shadow-md text-white"
        />
        <input
          type="submit"
          value="Save"
          className="btn btn-primary shadow-md text-white"
        />
      </div>
    </div>
  );
};

export default MesyJKA;
