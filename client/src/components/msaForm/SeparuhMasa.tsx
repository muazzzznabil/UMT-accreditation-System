/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

interface props {
  register: UseFormRegister<any>;
  separuh_max_Tahun?: number;
  separuh_max_Minggu?: number;
  separuh_max_Semester?: string;
  separuh_min_Tahun?: string;
  separuh_min_Minggu?: string;
  separuh_min_Semester?: string;
  separuh_SemesterPanjang_Semester?: string;
  separuh_SemesterPendek_Semester?: string;
  separuh_LatihanIndustri_Semester?: string;
}

const SeparuhMasa: React.FC<props> = ({
  register,
  separuh_max_Tahun,
  separuh_max_Minggu,
  separuh_max_Semester,
  separuh_min_Tahun,
  separuh_min_Minggu,
  separuh_min_Semester,
  separuh_SemesterPanjang_Semester,
  separuh_SemesterPendek_Semester,
  separuh_LatihanIndustri_Semester,
}) => {
  return (
    <div className="group flex items-center">
      <label htmlFor="jangkaPengajianPenuh" className="label-input-msa">
        Jangka Pengajian Separuh Masa
      </label>
      <div className="w-full flex space-x-9">
        <div className="flex flex-col items-start ">
          <label htmlFor="separuh_Maximum" className="mb-2">
            Jangka Maximum
          </label>
          <div className="flex space-x-2">
            <select
              {...register("Separuh_max_Tahun", { required: true })}
              id="Separuh_max_Tahun"
              className="select select-bordered "
              defaultValue={separuh_max_Tahun}
            >
              <option
                value=""
                selected
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
              {...register("Separuh_max_Minggu", { required: true })}
              id="Separuh_max_Minggu"
              className="select select-bordered "
              defaultValue={separuh_max_Minggu}
            >
              <option
                value=""
                selected
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
            {...register("Separuh_max_Semester", { required: true })}
            id="Separuh_max_Semester"
            className="select select-bordered w-full mt-2"
            defaultValue={separuh_max_Semester}
          >
            <option value="" selected disabled hidden className="text-gray-400">
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
          <label htmlFor="Separuh_minimum" className="mb-2">
            Jangka Minimum
          </label>
          <div className="flex space-x-2">
            <select
              {...register("Separuh_min_Tahun", { required: true })}
              id="Separuh_min_Tahun"
              className="select select-bordered "
              defaultValue={separuh_min_Tahun}
            >
              <option
                value=""
                selected
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
              {...register("Separuh_min_Minggu", { required: true })}
              id="Separuh_min_Minggu"
              className="select select-bordered "
              defaultValue={separuh_min_Minggu}
            >
              <option
                value=""
                selected
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
            {...register("Separuh_min_Semester", { required: true })}
            id="Separuh_min_Semester"
            className="select select-bordered w-full mt-2"
            defaultValue={separuh_min_Semester}
          >
            <option value="" selected disabled hidden className="text-gray-400">
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
          <label htmlFor="Separuh_semPanjang" className="mb-2">
            Semester Panjang
          </label>

          <select
            {...register("Separuh_SemesterPanjang_Semester", {
              required: true,
            })}
            id="Separuh_SemesterPanjang_Semester"
            className="select select-bordered w-full"
            defaultValue={separuh_SemesterPanjang_Semester}
          >
            <option value="" selected disabled hidden className="text-gray-400">
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
          <label htmlFor="Separuh_SemesterPendek" className="mb-2">
            Semester Pendek
          </label>
          <select
            {...register("Separuh_SemesterPendek_Semester", { required: true })}
            id="Separuh_SemesterPendek_Semester"
            className="select select-bordered w-full"
            defaultValue={separuh_SemesterPendek_Semester}
          >
            <option value="" selected disabled hidden className="text-gray-400">
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
          <label htmlFor="Separuh_LatihanIndustri" className="mb-2">
            Latihan Industri
          </label>
          <select
            {...register("Separuh_LatihanIndustri_Semester", {
              required: true,
            })}
            id="Separuh_LatihanIndustri_Semester"
            className="select select-bordered w-full"
            defaultValue={separuh_LatihanIndustri_Semester}
          >
            <option value="" selected disabled hidden className="text-gray-400">
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

export default SeparuhMasa;
