import { useState } from "react";
import { bentuk_kerjasama } from "../../constants/maklumatProgram_constant";
// import { MaklumatProgramModel } from "../../model/maklumat_program_model";

const ProgramKerjasama = () => {
  const [isKerjasama, setIsKerjasama] = useState(false);
  // const mp = new MaklumatProgramModel();

  return (
    <div className="flex w-full items-center">
      <label
        className="text-lg text-gray-700 mb-2  font-bold w-1/4"
        id="program-kerjasama"
      >
        Program Kerjasama
      </label>
      <div className="w-full flex justify-between">
        <select
          name="program_kerjasama"
          id="program-kerjasama"
          className="select select-bordered w-1/4 mr-2"
          onChange={(e) => {
            setIsKerjasama(e.target.value === "True");
            // formData.set("program_kerjasama", e.target.value);
          }}
          required
        >
          <option value="False">Tidak</option>
          <option value="True">Ya</option>
        </select>
        {isKerjasama && (
          <select
            name="jenis_kerjasama"
            id="jenisKerjasama"
            className="select select-bordered w-3/4"
            // onChange={(e) => formData.set("jenis_kerjasama", e.target.value)}
            required
          >
            <option value="" disabled selected hidden>
              Sila Pilih Jenis Kerjasama
            </option>
            {bentuk_kerjasama.map((option, index) => (
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
