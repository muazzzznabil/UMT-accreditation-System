import { useContext, useState } from "react";
import { TarikhSuratContext } from "./MesyJPKT";
import { MesyJKPT } from "../../model/mesyJKPT_model";

interface Props {
  mesyJKPT: MesyJKPT;
}

const TempohSah = ({ mesyJKPT }: Props) => {
  const tarikhSurat = useContext(TarikhSuratContext);
  const [tempohSah, setTempohSah] = useState<string>("");
  console.log(`Tarikh Surat in tempoh sah: ${tarikhSurat}`);

  const calculateTempohSah = (tempohSah: string) => {
    if (!tarikhSurat) return "";

    const date = tarikhSurat.split("-");
    const tahun = parseInt(date[0]);
    const sehinggaTarikh = tahun + parseInt(tempohSah);
    const newDateString = `${date[2]}-${date[1]}-${sehinggaTarikh}`;
    const newDate = new Date(newDateString);
    mesyJKPT.setSahSehingga(newDate);
    return newDateString;
  };

  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="" className="label-input-msa">
        Tempoh Sah Laku
      </label>
      <div className="w-full flex items-center ">
        <input
          type="number"
          name="tempohSah"
          className="input input-bordered w-1/6"
          placeholder="Tahun"
          value={tempohSah}
          onChange={(e) => {
            setTempohSah(e.target.value); //should be number instead of String
            calculateTempohSah(tempohSah);
            mesyJKPT.setTempohSah(parseInt(tempohSah));
          }}
        />
        <label htmlFor="estimateEndDate" className="text-gray-500 ml-2 text-lg">
          {/* {`Sah Sehingga: ${calculateTempohSah(tempohSah)}`} */}
          Sah Sehingga :{" "}
          <span className="font-semibold">{calculateTempohSah(tempohSah)}</span>
        </label>

        <input
          type="hidden"
          id="sah-sehingga"
          name="sah-sehingga"
          className="input input-bordered w-3/4"
          value={calculateTempohSah(tempohSah)}
        />
      </div>
    </div>
  );
};

export default TempohSah;
