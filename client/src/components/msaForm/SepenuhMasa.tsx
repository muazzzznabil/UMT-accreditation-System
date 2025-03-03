/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<any>;
  Sepenuh_max_Tahun?: string;
  Sepenuh_max_Minggu?: string;
  Sepenuh_max_Semester?: string;
  Sepenuh_min_Tahun?: string;
  Sepenuh_min_Minggu?: string;
  Sepenuh_min_Semester?: string;
  Sepenuh_SemesterPanjang_Semester?: string;
  Sepenuh_SemesterPendek_Semester?: string;
  Sepenuh_LatihanIndustri_Semester?: string;
}

const SepenuhMasa: React.FC<props> = ({
  register,
  Sepenuh_max_Tahun,
  Sepenuh_max_Minggu,
  Sepenuh_max_Semester,
  Sepenuh_min_Tahun,
  Sepenuh_min_Minggu,
  Sepenuh_min_Semester,
  Sepenuh_SemesterPanjang_Semester,
  Sepenuh_SemesterPendek_Semester,
  Sepenuh_LatihanIndustri_Semester,
}) => {
  return (
    <div className="group flex items-center">
      <label htmlFor="jangkaPengajianPenuh" className="label-input-msa">
        Jangka Pengajian Sepenuh Masa
      </label>
      <div className="w-full flex space-x-9">
        <div className="flex flex-col items-start ">
          <label htmlFor="Sepenuh_Maximum" className="mb-2">
            Jangka Maximum
          </label>
          <div className="flex space-x-2">
            <select
              {...register("Sepenuh_max_Tahun", { required: true })}
              id="Sepenuh_max_Tahun"
              className="select select-bordered "
              defaultValue={Sepenuh_max_Tahun}
            >
              <option
                value="placeholder"
                disabled
                hidden
                className="text-gray-400"
              >
                Tahun
              </option>
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Tahun
                </option>
              ))}
            </select>
            <select
              {...register("Sepenuh_max_Minggu", { required: true })}
              id="Sepenuh_max_Minggu"
              className="select select-bordered "
              defaultValue={Sepenuh_max_Minggu}
            >
              <option
                value="placeholder"
                disabled
                hidden
                className="text-gray-400"
              >
                Minggu
              </option>
              {[...Array(52).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Minggu
                </option>
              ))}
            </select>
          </div>
          <select
            {...register("Sepenuh_max_Semester", { required: true })}
            id="Sepenuh_max_Semester"
            className="select select-bordered w-full mt-2"
            defaultValue={Sepenuh_max_Semester}
          >
            <option
              value="placeholder"
              disabled
              hidden
              className="text-gray-400"
            >
              Semester
            </option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="Sepenuh_minimum" className="mb-2">
            Jangka Minimum
          </label>
          <div className="flex space-x-2">
            <select
              {...register("Sepenuh_min_Tahun", { required: true })}
              id="Sepenuh_min_Tahun"
              className="select select-bordered "
              defaultValue={Sepenuh_min_Tahun}
            >
              <option
                value="placeholder"
                disabled
                hidden
                className="text-gray-400"
              >
                Tahun
              </option>
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Tahun
                </option>
              ))}
            </select>
            <select
              {...register("Sepenuh_min_Minggu", { required: true })}
              id="Sepenuh_min_Minggu"
              className="select select-bordered "
              defaultValue={Sepenuh_min_Minggu}
            >
              <option
                value="placeholder"
                disabled
                hidden
                className="text-gray-400"
              >
                Minggu
              </option>
              {[...Array(52).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Minggu
                </option>
              ))}
            </select>
          </div>
          <select
            {...register("Sepenuh_min_Semester", { required: true })}
            id="Sepenuh_min_Semester"
            className="select select-bordered w-full mt-2"
            defaultValue={Sepenuh_min_Semester}
          >
            <option
              value="placeholder"
              disabled
              hidden
              className="text-gray-400"
            >
              Semester
            </option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="Sepenuh_semPanjang" className="mb-2">
            Semester Panjang
          </label>
          <select
            {...register("Sepenuh_SemesterPanjang_Semester", {
              required: true,
            })}
            id="Sepenuh_SemesterPanjang_Semester"
            className="select select-bordered w-full"
            defaultValue={Sepenuh_SemesterPanjang_Semester}
          >
            <option
              value="placeholder"
              disabled
              hidden
              className="text-gray-400"
            >
              Semester
            </option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="Sepenuh_SemesterPendek" className="mb-2">
            Semester Pendek
          </label>
          <select
            {...register("Sepenuh_SemesterPendek_Semester", { required: true })}
            id="Sepenuh_SemesterPendek_Semester"
            className="select select-bordered w-full"
            defaultValue={Sepenuh_SemesterPendek_Semester}
          >
            <option
              value="placeholder"
              disabled
              hidden
              className="text-gray-400"
            >
              Semester
            </option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="Sepenuh_LatihanIndustri" className="mb-2">
            Latihan Industri
          </label>
          <select
            {...register("Sepenuh_LatihanIndustri_Semester", {
              required: true,
            })}
            id="Sepenuh_LatihanIndustri_Semester"
            className="select select-bordered w-full"
            defaultValue={Sepenuh_LatihanIndustri_Semester}
          >
            <option
              value="placeholder"
              disabled
              hidden
              className="text-gray-400"
            >
              Semester
            </option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Semester
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SepenuhMasa;
