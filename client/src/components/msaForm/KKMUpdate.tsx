/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { tahap_mqf } from "../../constants/maklumatProgram_constant";
import { UseFormRegister } from "react-hook-form";

type TahapNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "";

interface Props {
  valueMQF?: string;
  valueSektorAkademik?: string;
  register: UseFormRegister<any>;
}

const KKMUpdate: React.FC<Props> = ({
  valueMQF,
  valueSektorAkademik,
  register,
}) => {
  const [selectedTahap, setSelectedTahap] = useState<TahapNumber>(
    (valueMQF as TahapNumber) || ""
  );

  useEffect(() => {
    if (valueMQF) {
      setSelectedTahap(valueMQF as TahapNumber);
    }
  }, [valueMQF]);

  const handleTahapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTahap(e.target.value as TahapNumber);
  };

  const sektorAkademikOptions = selectedTahap
    ? tahap_mqf[`tahap${selectedTahap}` as keyof typeof tahap_mqf] || []
    : [];

  return (
    <div className="flex w-full items-center">
      <label
        className="text-lg text-gray-700 mb-2 font-bold w-1/4"
        id="tahapMQF"
      >
        Tahap MQF
      </label>

      <div className="w-full flex justify-between">
        <select
          // name="tahapMQF"
          id="tahapMQF"
          className="select select-bordered w-1/4"
          // onChange={handleTahapChange}
          value={selectedTahap}
          required
          {...register("tahapMQF", { onChange: handleTahapChange })}
        >
          <option value="" disabled hidden>
            Sila Pilih Tahap MQF
          </option>
          <option value="1">Tahap 1</option>
          <option value="2">Tahap 2</option>
          <option value="3">Tahap 3</option>
          <option value="4">Tahap 4</option>
          <option value="5">Tahap 5</option>
          <option value="6">Tahap 6</option>
          <option value="7">Tahap 7</option>
          <option value="8">Tahap 8</option>
        </select>

        <select
          // name="sektorAkademik"
          id="sektorAkademik"
          className="select select-bordered w-3/4 ml-2"
          defaultValue={valueSektorAkademik}
          {...register("sektorAkademik")}
        >
          <option value="" disabled hidden>
            Sila Pilih Sektor Akademik
          </option>
          {sektorAkademikOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default KKMUpdate;
