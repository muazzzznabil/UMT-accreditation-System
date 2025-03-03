import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { FieldValue, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValue>;
  setValue: UseFormSetValue<FieldValue>;
  defValueTahun?: number;
  //   defValueSahSehingga: Date;
  tarikhSurat: Date;
}

const SahLaku: React.FC<Props> = ({
  register,
  setValue,
  defValueTahun,
  //   defValueSahSehingga,
  tarikhSurat,
}) => {
  const [bilTahun, setBilTahun] = useState(defValueTahun);

  useEffect(() => {
    const newSahSehingga = dayjs(tarikhSurat)
      .add(bilTahun, "year")
      .format("YYYY-MM-DD");
    setValue("sahSehingga", newSahSehingga);
  }, [bilTahun, tarikhSurat, setValue]);

  const sahSehingga = dayjs(tarikhSurat)
    .add(bilTahun, "year")
    .format("YYYY-MM-DD");

  return (
    <div className="flex w-full items-center">
      <label className="label-input-msa">Tempoh Sah Laku</label>
      <div className="w-full flex items-center">
        <input
          type="number"
          required
          placeholder="Tempoh Sah Laku (Tahun)"
          {...register("tempohSahLaku")}
          className="input input-bordered w-1/4"
          defaultValue={defValueTahun}
          onChange={(e) => setBilTahun(parseInt(e.target.value))}
        />
        <input
          type="hidden"
          {...register("sahSehingga")}
          defaultValue={sahSehingga}
        />
        <label htmlFor="estimateEndDate" className="text-gray-500 ml-2 text-lg">
          Sah Sehingga : <span className="font-semibold">{sahSehingga}</span>
        </label>
      </div>
    </div>
  );
};

export default SahLaku;
