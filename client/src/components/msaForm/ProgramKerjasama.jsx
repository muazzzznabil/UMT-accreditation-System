import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { struktur_program } from "../../constants/maklumatProgram_constant";

const ProgramKerjasama = () => {
  const [isKerjasama, setIsKerjasama] = useState(false);

  return (
    <div className="flex w-full items-center">
      <label className="text-lg text-gray-700 mb-2  font-bold w-1/4">
        Program Kerjasama
      </label>
      <div className="w-full flex  justify-between">
        <select
          name="tahapKKM"
          id="tahapKKM"
          className="select select-bordered w-1/4 mr-2"
          onChange={(e) => setIsKerjasama(e.target.value === "True")}
        >
          <option value="False" default>
            Tidak
          </option>
          <option value="True">Ya</option>
        </select>
        {isKerjasama && (
          <select
            name="jenisKerjasama"
            id="jenisKerjasama"
            className="select select-bordered w-3/4"
          >
            <option value="" disabled selected hidden>
              Sila Pilih Jenis Kerjasama
            </option>
            {struktur_program.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default ProgramKerjasama;
