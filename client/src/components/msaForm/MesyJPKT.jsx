import React, { createContext, useState } from "react";
import DatePicker from "./DatePicker";
import TempohSah from "./TempohSah";

const TarikhSuratContext = createContext();

const MesyJPKT = () => {
  const [tarikhSurat, setTarikhSurat] = useState("");

  console.log(` Tarikh Surat:${tarikhSurat}`);

  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <DatePicker label={"Tarikh Mesyuarat"} name={"tarikhMesyuarat"} />
      <DatePicker label={"Tarikh Terima Surat"} name={"tarikhTerimaSurat"} />
      <DatePicker
        label={"Tarikh Surat"}
        name={"tarikhSurat"}
        onChange={(e) => setTarikhSurat(e.target.value)}
      />
      <TarikhSuratContext.Provider value={tarikhSurat}>
        <TempohSah />
      </TarikhSuratContext.Provider>
    </div>
  );
};

export default MesyJPKT;
export { TarikhSuratContext };
