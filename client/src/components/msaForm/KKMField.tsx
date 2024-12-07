import { useState } from "react";
import { tahap_mqf } from "../../constants/maklumatProgram_constant.js";

const KKMField = () => {
  const [tahap, setTahap] = useState("");

  interface DropdownProps {
    isDisabled: boolean;
    tahapmqf: string[];
  }

  const SektorAkademikDropdown: React.FC<DropdownProps> = ({ isDisabled, tahapmqf }) => {
    return (
      <select
        name="sektorAkademik"
        id="sektorAkademik"
        className="select ml-2 select-bordered w-3/4 "
        disabled={isDisabled}
        defaultValue={""}
      >
        {(tahap === "6" || tahap === "7" || tahap === "8") && (
          <option value="" disabled hidden>
            Sila Pilih Sektor Akademik
          </option>
        )}

        {tahapmqf.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="flex w-full ">
      <label className="text-lg text-gray-700 mb-2 font-bold w-1/4 ">
        Tahap KKM
      </label>
      <div className="w-full flex justify-between">
        <select
          name="tahapKKM"
          id="tahapKKM"
          className="select select-bordered w-1/4"
          onChange={(e) => setTahap(e.target.value)}
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
        {tahap === "1" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap1}
            isDisabled={true}
          />
        )}
        {tahap === "2" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap2}
            isDisabled={true}
          />
        )}
        {tahap === "3" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap3}
            isDisabled={true}
          />
        )}
        {tahap === "4" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap4}
            isDisabled={true}
          />
        )}
        {tahap === "5" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap5}
            isDisabled={true}
          />
        )}
        {tahap === "6" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap6}
            isDisabled={false}
          />
        )}
        {tahap === "7" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap7}
            isDisabled={false}
          />
        )}
        {tahap === "8" && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf.tahap8}
            isDisabled={false}
          />
        )}
      </div>
    </div>
  );
};

export default KKMField;
