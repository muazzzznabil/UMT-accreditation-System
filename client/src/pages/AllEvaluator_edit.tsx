/* eslint-disable @typescript-eslint/no-explicit-any */
import { useThemeStore } from "../utils/useThemeStore";
import LabelWrapper from "../components/LabelWrapper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ptj from "../../user_config/ptj.json";
import Select from "react-select";
import posisi_penilai from "../../user_config/posisi_penilai.json";
import bidang_penilai from "../../user_config/bidang_penilai.json";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import DateUpdate from "../components/msaForm/DateUpdate";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

interface evaluators {
  id: number;
  evaluator_name: string;
  evaluator_email: string;
  evaluator_phone: string;
  evaluator_faculty: string;
  evaluator_position: string;
  evaluator_status: string;
  evaluator_field: string;
  evaluator_appointment_date: Date;
  evaluator_end_date: Date;
  evaluator_appointment_period: number;
  program_id: number;
  evaluator_specific_field: string;
}

const AllEvaluator_edit = () => {
  const { evaluator_id } = useParams();

  const themeStore = useThemeStore();
  const { register, control, setValue, handleSubmit, reset } = useForm();
  const [bidangSpesifik, setBidangSpesifik] = useState<string>("");
  const [bidangSpesifikStr, setBidangSpesifikStr] = useState<string>("");
  const [tarikhSurat2, setTarikhSurat2] = useState<Date>(new Date());
  const [bilTahun, setBilTahun] = useState<any>(2);
  const sahSehingga = dayjs(tarikhSurat2)
    .add(bilTahun, "year")
    .format("DD/MM/YYYY");
  const { VITE_DATABASE_HOST } = import.meta.env;
  const [evaluator, setEvaluator] = useState<evaluators | null>(null);

  const handleAddBidangSpesifik = (bidang: string) => {
    if (bidang && !bidangSpesifikStr.includes(bidang)) {
      setBidangSpesifikStr((prev) => (prev ? `${prev},${bidang}` : bidang));
    }
    console.log(bidangSpesifikStr);
  };

  useEffect(() => {
    const newSahSehingga = dayjs(tarikhSurat2)
      .add(bilTahun, "year")
      .format("YYYY-MM-DD");
    setValue("evaluator_end_date", newSahSehingga);
  }, [bilTahun, tarikhSurat2, setValue]);

  useEffect(() => {
    setValue("evaluator_specific", bidangSpesifikStr);
  }, [bidangSpesifikStr, setValue]);

  const handleRemoveBidangSpesifik = (bidang: string) => {
    if (bidangSpesifikStr.includes(bidang)) {
      const newBidangSpesifikStr = bidangSpesifikStr
        .split(",")
        .filter((bdg) => bdg !== bidang)
        .join(",");
      setBidangSpesifikStr(newBidangSpesifikStr);
    }
  };

  //   const onSubmit: SubmitHandler<any> = async (data) => {
  //     // setValue("evaluator_specific", bidangSpesifik);
  //     console.table(data);
  //   };

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      axios
        .put(
          `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/${evaluator_id}/kemaskini`,
          data
        )
        .then((response) => {
          console.table(response.data);
          Swal.fire({
            title: "Maklumat Penilai Dikemaskini!",
            text: "Maklumat Penilai Telah Berjaya Didaftarkan!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              // window.location.href = "/penilai-dalaman/" + id + "/" + name;
              window.location.href = "/senarai-penilai-dalaman";
            }
          });
        });
    } catch (error: any) {
      console.table(error.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Maklumat Penilai Tidak Berjaya Didaftarkan!",
      });
    }
  };

  const getEvaluator = async () => {
    const response = await axios.get<evaluators[]>(
      `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/${evaluator_id}`
    );
    console.table(response.data);
    setEvaluator(response.data[0]);
    setTarikhSurat2(
      dayjs(response.data[0].evaluator_appointment_date).toDate()
    );
    setBidangSpesifikStr(
      response.data[0].evaluator_specific_field
        ? response.data[0].evaluator_specific_field
        : ""
    );
  };

  useEffect(() => {
    getEvaluator();
  }, []);

  useEffect(() => {
    if (evaluator) {
      reset({
        evaluator_position: evaluator.evaluator_position,
        evaluator_name: evaluator.evaluator_name,
        evaluator_email: evaluator.evaluator_email,
        evaluator_phone: evaluator.evaluator_phone,
        evaluator_faculty: evaluator.evaluator_faculty,
        evaluator_status: evaluator.evaluator_status,
        evaluator_field: evaluator.evaluator_field,
        evaluator_appointment_date: dayjs(evaluator.evaluator_appointment_date)
          .format("YYYY-MM-DD")
          .toString(),
        evaluator_end_date: dayjs(evaluator.evaluator_end_date)
          .format("YYYY-MM-DD")
          .toString(),
        evaluator_appointment_period: evaluator.evaluator_appointment_period,
      });
    }
  }, [evaluator, reset]);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col  duration-300">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Kemaskini Maklumat Penilai Dalaman
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Kemaskini Maklumat Penilai Dalaman </li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container mt-4 mb-8 mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          <LabelWrapper label="Nama Penuh Penilai" labelId="evaluator_name">
            <input
              className="input w-full"
              placeholder="Sila Isikan Nama Lengkap Penilai"
              {...register("evaluator_name")}
              defaultValue={evaluator?.evaluator_name}
            />
          </LabelWrapper>
          <LabelWrapper label="Email Penilai" labelId="evaluator_name">
            <input
              className="input w-full"
              placeholder="e.g : contoh@ocean.umt.edu.my"
              {...register("evaluator_email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
              defaultValue={evaluator?.evaluator_email}
            />
          </LabelWrapper>
          <LabelWrapper label="No. Telefon Penilai" labelId="evaluator_phone">
            <input
              className="input w-full"
              placeholder="e.g : 01123456789"
              {...register("evaluator_phone", {
                required: true,
                pattern: /^[0-9]{10,15}$/,
              })}
              defaultValue={evaluator?.evaluator_phone}
            />
          </LabelWrapper>

          <LabelWrapper label="Fakulti/PTJ Penilai" labelId="evaluator_faculty">
            <Controller
              name="evaluator_faculty"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  unstyled
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  placeholder="Pilih Fakulti/PTJ Penilai"
                  classNames={{
                    control: () =>
                      `select select-bordered w-full p-2 border rounded-lg ${
                        themeStore.darkMode
                          ? "bg-base-200 border-gray-600 text-gray-300"
                          : "bg-white border-gray-300 text-gray-900"
                      } focus:ring focus:ring-primary`,

                    menu: () =>
                      `border shadow-md rounded-md mt-1 ${
                        themeStore.darkMode
                          ? "bg-base-200 border-gray-600"
                          : "bg-white border-gray-300"
                      }`,

                    option: ({ isFocused, isSelected }) =>
                      `p-2 cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white"
                          : isFocused
                          ? themeStore.darkMode
                            ? "bg-primary/20 text-gray-300"
                            : "bg-gray-200 text-gray-900"
                          : themeStore.darkMode
                          ? "bg-base-200 text-gray-300"
                          : "bg-white text-gray-900"
                      }`,

                    singleValue: () =>
                      `${
                        themeStore.darkMode ? "text-gray-300" : "text-gray-900"
                      }`,
                  }}
                  options={ptj.map((code) => ({
                    value: code,
                    label: code,
                  }))}
                  value={
                    field.value
                      ? ptj.find((c) => c === field.value)
                        ? { value: field.value, label: field.value }
                        : null
                      : evaluator?.evaluator_faculty
                      ? {
                          value: evaluator.evaluator_faculty,
                          label: evaluator.evaluator_faculty,
                        }
                      : null
                  }
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption?.value)
                  }
                />
              )}
            />
          </LabelWrapper>

          <LabelWrapper label="Posisi Penilai" labelId="evaluator_position">
            <select
              {...register("evaluator_position")}
              className="input w-1/2 select"
            >
              <option value="" disabled hidden>
                Pilih posisi penilai
              </option>
              {posisi_penilai.map((posisi) => (
                <option key={posisi} value={posisi}>
                  {posisi}
                </option>
              ))}
            </select>
          </LabelWrapper>

          <LabelWrapper label="Status Penilai" labelId="evaluator_status">
            <input
              type="radio"
              {...register("evaluator_status")}
              className="radio radio-primary mr-1"
              defaultChecked
              value="Aktif"
              id="Aktif"
            />
            <label htmlFor="aktif" className="mr-4">
              Aktif
            </label>
            <input
              type="radio"
              {...register("evaluator_status")}
              className="radio radio-primary mr-1"
              id="tidak_aktif"
              value="tidak_aktif"
            />
            <label htmlFor="tidak_aktif">Tidak Aktif</label>
          </LabelWrapper>
          <LabelWrapper label="Bidang Penilai" labelId="evaluator_field">
            <select
              {...register("evaluator_field")}
              className="input w-1/2 select"
            >
              <option value="" selected disabled hidden>
                Pilih bidang penilai
              </option>
              {bidang_penilai.map((bidang: string) => (
                <option key={bidang} value={bidang}>
                  {bidang}
                </option>
              ))}
            </select>
          </LabelWrapper>
          <LabelWrapper
            label="Bidang Spesifik Penilai"
            labelId="evaluator_specific"
          >
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  className="input input-bordered w-3/4"
                  value={bidangSpesifik}
                  onChange={(e) => setBidangSpesifik(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-success ml-2 text-white"
                  onClick={() => {
                    handleAddBidangSpesifik(bidangSpesifik);
                    setBidangSpesifik("");
                  }}
                >
                  <FaPlusCircle className="size-4" />
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap mt-2">
                {bidangSpesifikStr.split(",").map((bidang: string, index) => (
                  <span key={index} className="badge badge-soft mr-2 mb-2">
                    {bidang}{" "}
                    <button
                      onClick={() => {
                        handleRemoveBidangSpesifik(bidang);
                        setBidangSpesifik("");
                      }}
                      type="button"
                    >
                      <FaTimes className="size-4 hover:cursor-pointer" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <input
              type="hidden"
              {...register("evaluator_specific")}
              value={bidangSpesifikStr}
            />
          </LabelWrapper>
          <DateUpdate
            name="evaluator_appointment_date"
            label="Tarikh Lantikan Penilai"
            register={register}
            onChange={(e) => setTarikhSurat2(dayjs(e.target.value).toDate())}
          />

          {/* Input for evaluator appointment period */}
          <div className="flex mb-4 items-center">
            <label htmlFor="" className="  label-input-msa2">
              Tempoh Lantikan Penilai
            </label>
            <div className="w-full flex flex-col">
              <div className="flex flex-row items-center">
                <input
                  type="number"
                  id="evaluator_appointment_period"
                  placeholder="Tahun"
                  required
                  defaultValue={2}
                  className="input input-bordered w-1/12"
                  {...register("evaluator_appointment_period", {
                    required: true,
                    onChange: (e) => setBilTahun(parseInt(e.target.value)),
                  })}
                />
                <p className="ml-2">Tahun</p>

                <input
                  type="hidden"
                  {...register("evaluator_end_date")}
                  value={sahSehingga}
                />
              </div>
            </div>
          </div>
          {/*Input for evaluator appointment period */}

          {/* Input for evaluator appointment period */}
          <div className="flex mb-4 items-center">
            <label htmlFor="" className="  label-input-msa2">
              Dilantik Sehingga
            </label>
            <div className="w-full">
              <p
                className={`w-1/8 font-normal py-1 text-md border-gray-300 rounded-sm border border-solid text-center ${
                  themeStore.darkMode ? "bg-base-700" : "bg-white"
                }`}
              >
                {sahSehingga}
              </p>
            </div>
          </div>
          {/*Input for evaluator appointment period */}
          <div className="flex space-x-4 justify-end">
            <input
              type="reset"
              value="Reset"
              className="btn btn-error shadow-md text-white"
            />
            <button
              type="submit"
              className="btn btn-primary shadow-md text-white"
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Tambah Penilai Program?",
                  showDenyButton: true,
                  confirmButtonText: "Simpan",
                  denyButtonText: `Batal`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSubmit(onSubmit)();
                  } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                  }
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AllEvaluator_edit;
