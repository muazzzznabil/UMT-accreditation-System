import  { useState } from "react";
import { struktur_program } from "../../constants/maklumatProgram_constant";

const ProgramKerjasama = () => {
  const [isKerjasama, setIsKerjasama] = useState(false);

  return (
    <div className="flex w-full items-center">
      <label
        className="text-lg text-gray-700 mb-2  font-bold w-1/4"
        id="program-kerjasama"
      >
        Program Kerjasama
      </label>
      <div className="w-full flex  justify-between">
        <select
          name="program-kerjasama"
          id="program-kerjasama"
          className="select select-bordered w-1/4 mr-2"
          onChange={(e) => setIsKerjasama(e.target.value === "True")}
        >
          <option value="False" >
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
            {struktur_program.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default ProgramKerjasama;
