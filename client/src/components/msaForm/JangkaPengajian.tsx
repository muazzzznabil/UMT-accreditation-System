const JangkaPengajian = () => {
  return (
    <div className="group flex items-center">
      <label htmlFor="jangkaPengajian" className="label-input-msa">
        Jangka Masa Pengajian
      </label>
      <div className="w-full flex space-x-9">
        <div className="flex flex-col items-start  ">
          <label htmlFor="jenisPengajian" className="mb-2">
            Jenis Pengajian
          </label>
          <select
            name="jenisPengajian"
            id="jenisPengajian"
            className="select select-bordered select-md w-60 block"
          >
            <option value="Sepenuh Masa">Sepenuh Masa</option>
            <option value="Separuh Masa">Separuh Masa</option>
          </select>
        </div>
        <div className="flex flex-col items-start ">
          <label htmlFor="minimumPengajian" className="mb-2">
            Minimum
          </label>
          <div className="flex space-x-2">
            <select
              name="minTahun"
              id="minTahun"
              className="select select-bordered "
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
              name="minBulan"
              id="minBulan"
              className="select select-bordered "
            >
              <option
                value=""
                selected
                disabled
                hidden
                className="text-gray-400"
              >
                Bulan
              </option>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Bulan
                </option>
              ))}
            </select>
          </div>
          <select
            name="minSemester"
            id="minSemester"
            className="select select-bordered w-full mt-2"
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
          <label htmlFor="maximumPengajian" className="mb-2">
            Maximum
          </label>
          <div className="flex space-x-2">
            <select
              name="maxTahun"
              id="maxTahun"
              className="select select-bordered "
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
              name="maxBulan"
              id="maxBulan"
              className="select select-bordered "
            >
              <option
                value=""
                selected
                disabled
                hidden
                className="text-gray-400"
              >
                Bulan
              </option>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Bulan
                </option>
              ))}
            </select>
          </div>
          <select
            name="maxSemester"
            id="maxSemester"
            className="select select-bordered w-full mt-2"
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

export default JangkaPengajian;
