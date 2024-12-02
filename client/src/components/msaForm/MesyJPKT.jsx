import React, { createContext, useState } from "react";
import DatePicker from "./DatePicker";
import TempohSah from "./TempohSah";
import BilMesyuarat from "./BilMesyuarat";
import MuatNaikSurat from "./MuatNaikSurat";

const TarikhSuratContext = createContext();

const MesyJPKT = () => {
  const [tarikhSurat, setTarikhSurat] = useState("");

  console.log(` Tarikh Surat:${tarikhSurat}`);

  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <DatePicker
        label={"Tarikh Surat"}
        name={"tarikhSurat"}
        onChange={(e) => setTarikhSurat(e.target.value)}
      />
      <DatePicker label={"Tarikh Terima Surat"} name={"tarikhTerimaSurat"} />
      <DatePicker label={"Tarikh Mesyuarat"} name={"tarikhMesyuarat"} />

      <TarikhSuratContext.Provider value={tarikhSurat}>
        <TempohSah />
      </TarikhSuratContext.Provider>
      <BilMesyuarat />
      <MuatNaikSurat label={"Muat Naik Surat"} />

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

export default MesyJPKT;
export { TarikhSuratContext };
