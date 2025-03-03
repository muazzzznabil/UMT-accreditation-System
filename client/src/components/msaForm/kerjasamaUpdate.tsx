import { useState, useEffect } from "react";
import { bentuk_kerjasama } from "../../constants/maklumatProgram_constant";
import { FieldValue, UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<FieldValue>;
  programKerjasama?: string;
  jenisKerjasama?: string;
}

const KerjasamaUpdate: React.FC<props> = ({
  register,
  programKerjasama,
  jenisKerjasama,
}) => {
  const [isKerjasama, setIsKerjasama] = useState(false);

  useEffect(() => {
    setIsKerjasama(programKerjasama === "True");
  }, [programKerjasama]);

  return (
    <div className="flex w-full items-center">
      <label
        className="text-lg text-gray-700 mb-2 font-bold w-1/4"
        id="program-kerjasama"
      >
        Program Kerjasama
      </label>
      <div className="w-full flex justify-between">
        <select
          id="program-kerjasama"
          {...register("program_kerjasama")}
          className="select select-bordered w-1/4 mr-2"
          defaultValue={programKerjasama || ""}
          onChange={(e) => {
            setIsKerjasama(e.target.value === "True");
          }}
          required
        >
          <option value="" disabled hidden>
            Sila Pilih Program Kerjasama
          </option>
          <option value="False">Tidak</option>
          <option value="True">Ya</option>
        </select>
        {isKerjasama && (
          <select
            id="jenisKerjasama"
            {...register("jenis_kerjasama")}
            className="select select-bordered w-3/4"
            defaultValue={jenisKerjasama || ""}
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

export default KerjasamaUpdate;
