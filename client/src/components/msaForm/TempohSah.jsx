import React, { useContext, useState } from "react";
import { TarikhSuratContext } from "./MesyJPKT";

const TempohSah = () => {
  const tarikhSurat = useContext(TarikhSuratContext);
  const [tempohSah, setTempohSah] = useState(0);
  console.log(`Tarikh Surat in tempoh sah: ${tarikhSurat}`);

  const calculateTempohSah = (tempohSah) => {
    if (!tarikhSurat) return "";

    const date = tarikhSurat.split("-");
    const tahun = parseInt(date[0]);
    const sehinggaTarikh = tahun + parseInt(tempohSah);
    const newDateString = `${sehinggaTarikh}-${date[1]}-${date[2]}`;
    return newDateString;
  };

  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="" className="label-input-msa">
        Tempoh Sah Laku
      </label>
      <div className="w-full flex items-center">
        <input
          type="number"
          className="input input-bordered w-1/6"
          placeholder="Tahun"
          value={tempohSah}
          onChange={(e) => {
            setTempohSah(e.target.value);
            calculateTempohSah(tempohSah);
          }}
        />
        <label htmlFor="estimateEndDate" className="">
          sehingga
        </label>
        <input
          type="text"
          id="estimateEndDate"
          className="input input-bordered w-full"
          value={calculateTempohSah(tempohSah)}
        />
      </div>
    </div>
  );
};

export default TempohSah;
