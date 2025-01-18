import React, { createContext, useState } from "react";
import DatePicker from "./DatePicker";
import TempohSah from "./TempohSah";
import BilMesyuarat from "./BilMesyuarat";
import MuatNaikSurat from "./MuatNaikSurat";
import { MesyJKPT } from "../../model/mesyJKPT_model";

const TarikhSuratContext = createContext("");

interface Props {
  mesyJKPT: MesyJKPT;
  formData: FormData;
}

const MesyJPKT = ({ mesyJKPT, formData }: Props) => {
  const [tarikhSurat, setTarikhSurat] = useState("");

  console.log(` Tarikh Surat:${tarikhSurat}`);

  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <DatePicker
        label={"Tarikh Surat"}
        name={"tarikhSurat"}
        onChange={(e) => setTarikhSurat(e.target.value)}
      />
      <DatePicker
        label={"Tarikh Terima Surat"}
        name={"tarikhTerimaSurat"}
        onChange={(e) =>
          mesyJKPT.setTarikhTerimaSurat(new Date(e.target.value))
        }
      />
      <DatePicker
        label={"Tarikh Mesyuarat"}
        name={"tarikhMesyuarat"}
        onChange={(e) =>
          mesyJKPT.setTarikhTerimaSurat(new Date(e.target.value))
        }
      />

      <TarikhSuratContext.Provider value={tarikhSurat}>
        <TempohSah mesyJKPT={mesyJKPT} />
      </TarikhSuratContext.Provider>
      <BilMesyuarat mesyJKPT={mesyJKPT} />
      <MuatNaikSurat
        label={"Muat Naik Surat"}
        // jkpt_model={mesyJKPT}
        formData={formData}
      />

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
