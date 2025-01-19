// import { MaklumatProgramModel } from "../../model/maklumat_program_model";

interface JangkaPengajianSeparuhMasaProps {
  // mp: MaklumatProgramModel;
  // formData: FormData;
}

const JangkaPengajianSeparuhMasa: React.FC<JangkaPengajianSeparuhMasaProps> = (
  {
    // mp,
    // formData,
  }
) => {
  // const mp = new MaklumatProgramModel();

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
              name="Separuh_max_Tahun"
              id="Separuh_max_Tahun"
              className="select select-bordered "
              // onChange={(e) =>
              //   // formData.set("Separuh_max_Tahun", e.target.value)
              // }
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
              name="Separuh_max_Minggu"
              id="Separuh_max_Minggu"
              className="select select-bordered "
              // onChange={(e) =>
              //   // formData.set("Separuh_max_Minggu", e.target.value)
              // }
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
            name="Separuh_max_Semester"
            id="Separuh_max_Semester"
            className="select select-bordered w-full mt-2"
            // onChange={(e) =>
            //   formData.set("Separuh_max_Semester", e.target.value)
            // }
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
              name="Separuh_min_Tahun"
              id="Separuh_min_Tahun"
              className="select select-bordered "
              // onChange={(e) =>
              //   formData.set("Separuh_min_Tahun", e.target.value)
              // }
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
              name="Separuh_min_Minggu"
              id="Separuh_min_Minggu"
              className="select select-bordered "
              // onChange={(e) =>
              //   formData.set("Separuh_min_Minggu", e.target.value)
              // }
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
            name="Separuh_min_Semester"
            id="Separuh_min_Semester"
            className="select select-bordered w-full mt-2"
            // onChange={(e) =>
            //   formData.set("Separuh_min_Semester", e.target.value)
            // }
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
            name="Separuh_SemesterPanjang_Semester"
            id="Separuh_SemesterPanjang_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Separuh_SemesterPanjang_Semester", e.target.value)
            // }
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
            name="Separuh_SemesterPendek_Semester"
            id="Separuh_SemesterPendek_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Separuh_SemesterPendek_Semester", e.target.value)
            // }
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
            name="Separuh_LatihanIndustri_Semester"
            id="Separuh_LatihanIndustri_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Separuh_LatihanIndustri_Semester", e.target.value)
            // }
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

export default JangkaPengajianSeparuhMasa;
