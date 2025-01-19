// import { MaklumatProgramModel } from "../../model/maklumat_program_model";

interface JangkaPengajianSepenuhMasaProps {
  // mp: MaklumatProgramModel;
  // formData: FormData;
}

const JangkaPengajianSepenuhMasa: React.FC<JangkaPengajianSepenuhMasaProps> = (
  {
    // mp,
    // formData,
  }
) => {
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
              name="Sepenuh_max_Tahun"
              id="Sepenuh_max_Tahun"
              className="select select-bordered "
              // onChange={(e) =>
              //   // formData.set("Sepenuh_max_Tahun", e.target.value)
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
              name="Sepenuh_max_Minggu"
              id="Sepenuh_max_Minggu"
              className="select select-bordered "
              // onChange={(e) =>
              //   formData.set("Sepenuh_max_Minggu", e.target.value)
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
            name="Sepenuh_max_Semester"
            id="Sepenuh_max_Semester"
            className="select select-bordered w-full mt-2"
            // onChange={(e) =>
            //   formData.set("Sepenuh_max_Semester", e.target.value)
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
          <label htmlFor="Sepenuh_minimum" className="mb-2">
            Jangka Minimum
          </label>
          <div className="flex space-x-2">
            <select
              name="Sepenuh_min_Tahun"
              id="Sepenuh_min_Tahun"
              className="select select-bordered "
              // onChange={(e) =>
              //   formData.set("Sepenuh_min_Tahun", e.target.value)
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
              name="Sepenuh_min_Minggu"
              id="Sepenuh_min_Minggu"
              className="select select-bordered "
              // onChange={(e) =>
              //   formData.set("Sepenuh_min_Minggu", e.target.value)
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
            name="Sepenuh_min_Semester"
            id="Sepenuh_min_Semester"
            className="select select-bordered w-full mt-2"
            // onChange={(e) =>
            //   formData.set("Sepenuh_min_Semester", e.target.value)
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
          <label htmlFor="Sepenuh_semPanjang" className="mb-2">
            Semester Panjang
          </label>

          <select
            name="Sepenuh_SemesterPanjang_Semester"
            id="Sepenuh_SemesterPanjang_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Sepenuh_SemesterPanjang_Semester", e.target.value)
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
          <label htmlFor="Sepenuh_SemesterPendek" className="mb-2">
            Semester Pendek
          </label>
          <select
            name="Sepenuh_SemesterPendek_Semester"
            id="Sepenuh_SemesterPendek_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Sepenuh_SemesterPendek_Semester", e.target.value)
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
          <label htmlFor="Sepenuh_LatihanIndustri" className="mb-2">
            Latihan Industri
          </label>
          <select
            name="Sepenuh_LatihanIndustri_Semester"
            id="Sepenuh_LatihanIndustri_Semester"
            className="select select-bordered w-full"
            // onChange={(e) =>
            //   formData.set("Sepenuh_LatihanIndustri_Semester", e.target.value)
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

export default JangkaPengajianSepenuhMasa;
