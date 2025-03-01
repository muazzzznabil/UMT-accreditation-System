import React, { useState } from "react";
import { tahap_mqf } from "../../constants/maklumatProgram_constant";
// import { MaklumatProgramModel } from "../../model/maklumat_program_model";

interface KKMFieldProps {
  valueMQF?: string;
  valueSektorAkademik?: string;
}

const KKMField: React.FC<KKMFieldProps> = ({
  // valueMQF,
  valueSektorAkademik,
}) => {
  const [tahap, setTahap] = useState("");

  interface DropdownProps {
    isDisabled: boolean;
    tahapmqf: string[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }

  const SektorAkademikDropdown: React.FC<DropdownProps> = ({
    isDisabled,
    tahapmqf,
    onChange,
  }) => {
    return (
      <select
        name="sektorAkademik"
        id="sektorAkademik"
        className="select ml-2 select-bordered w-3/4"
        disabled={isDisabled}
        defaultValue={""}
        value={valueSektorAkademik}
        required
        onChange={onChange}
      >
        <option value="" disabled hidden>
          Sila Pilih Sektor Akademik
        </option>
        {tahapmqf.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="flex w-full">
      <label className="text-lg text-gray-700 mb-2 font-bold w-1/4">
        Tahap MQF
      </label>
      <div className="w-full flex justify-between">
        <select
          name="tahapKKM"
          id="tahapKKM"
          className="select select-bordered w-1/4"
          value={tahap}
          onChange={(e) => {
            setTahap(e.target.value);
            // mp.setTahapMQF(e.target.value);
            // formData.set("tahapMQF", e.target.value);
          }}
        >
          <option value="" disabled hidden>
            Sila Pilih Tahap MQF
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
        {(tahap === "1" ||
          tahap === "2" ||
          tahap === "3" ||
          tahap === "4" ||
          tahap === "5" ||
          tahap === "6" ||
          tahap === "7" ||
          tahap === "8") && (
          <SektorAkademikDropdown
            tahapmqf={tahap_mqf[`tahap${tahap}`]}
            // onChange={(e) => formData.set("sektorAkademik", e.target.value)}
            isDisabled={false}
          />
        )}
      </div>
    </div>
  );
};

export default KKMField;
