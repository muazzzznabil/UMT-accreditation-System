/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import { SubmitHandler, useForm } from "react-hook-form";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import { fakulti_List } from "../constants/maklumatProgram_constant";
import DateUpdate from "../components/msaForm/DateUpdate";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const RegisterEvaluator = () => {
  const { name, id } = useParams();
  const themeStore = useThemeStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [tarikhSurat2, setTarikhSurat2] = useState<Date>(new Date());
  const [bilTahun, setBilTahun] = useState<any>(2);
  const { VITE_DATABASE_HOST } = import.meta.env;

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      axios
        .post(`${VITE_DATABASE_HOST}penilai-dalaman/daftar-penilai`, data)
        .then((response) => {
          console.table(response.data);
          Swal.fire({
            title: "Penilai Didaftarkan!",
            text: "Penilai Berjaya Didaftarkan!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/penilai-dalaman/" + id + "/" + name;
            }
          });
        });
    } catch (error: any) {
      console.table(error.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Program Tidak Berjaya Didaftarkan!",
      });
    }
  };

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };
  const sahSehingga = dayjs(tarikhSurat2)
    .add(bilTahun, "year")
    .format("DD-MM-YYYY");

  useEffect(() => {
    const newSahSehingga = dayjs(tarikhSurat2)
      .add(bilTahun, "year")
      .format("YYYY-MM-DD");
    setValue("evaluator_end_date", newSahSehingga);
  }, [bilTahun, tarikhSurat2, setValue]);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col  duration-300">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Daftar Penilai Dalaman: <span className="font-bold">{name}</span>
      </h1>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li>
          <li>
            <a href={`/penilai-dalaman/${id}/${name}`}>
              Senarai Penilai Dalaman
            </a>
          </li>
          <li>Daftar Penilai Program</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <input type="hidden" {...register("program_id")} value={id} />
        <div
          className={`container mt-4  mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          {/* Input for Name */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_name" className="label-input-msa2 ">
              Nama Penilai
            </label>
            <div className="w-full flex-col">
              <input
                id="evaluator_name"
                placeholder="Sila Isikan Nama Lengkap Penilai"
                required
                className="input input-bordered w-full "
                {...register("evaluator_name", { required: true })}
              />
              {errors.evaluator_name && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan Nama Lengkap Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for Name */}

          {/* Input for Email */}
          <div className="flex mb-4 items-center">
            <label htmlFor="" className="  label-input-msa2">
              Email Penilai
            </label>
            <div className="w-full flex flex-col">
              <input
                type="email"
                id="evaluator_email"
                placeholder="e.g : contoh@ocean.umt.edu.my"
                required
                className="input input-bordered w-full "
                {...register("evaluator_email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.evaluator_email?.type === "pattern" && (
                <p className="text-red-500 text-xs mt-1">
                  Format Email Tidak Sah e.g. contoh@example.com
                </p>
              )}{" "}
              {errors.evaluator_email && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan Email Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for Email */}

          {/* Input for Phone Number */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_phone" className="  label-input-msa2">
              No. Telefon Penilai
            </label>
            <div className="w-full flex flex-col">
              <input
                id="evaluator_phone"
                type="tel"
                placeholder="e.g : 01123456789"
                required
                className="input input-bordered w-full "
                {...register("evaluator_phone", {
                  required: true,
                })}
              />
              {errors.evaluator_phone && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan No. Telefon Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for Phone Number */}

          {/* Input for Faculty */}
          <div className="flex mb-4 items-center">
            <div className="w-full flex flex-col">
              <DropdownUpdate
                label="Fakulti Penilai"
                labelId="evaluator_faculty"
                register={register}
                defaultValue={"placeholder"}
                placeholderOptions="Sila Pilih Fakulti Penilai"
                options={fakulti_List}
              />
              {errors.evaluator_faculty && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Pilih Fakulti Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for Faculty */}

          {/* Input for evaluator position */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_position" className="  label-input-msa2">
              Posisi Penilai
            </label>
            <div className="w-full flex flex-col">
              <select
                {...register("evaluator_position")}
                id="evaluator_position"
                className=" select select-bordered w-full "
                // defaultValue={evaluator?.evaluator_position}
              >
                <option value="" disabled hidden selected>
                  Sila Pilih Posisi Penilai
                </option>
                <option value="Ketua Panel Penilai Dalaman">
                  Ketua Panel Penilai Dalaman
                </option>
                <option value="Ahli Panel Penilai Dalaman">
                  Ahli Panel Penilai Dalaman
                </option>
              </select>
              {errors.evaluator_position && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan Posisi Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for evaluator position */}

          {/* Input for evaluator status */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_status" className="  label-input-msa2">
              Status Penilai
            </label>
            <div className="w-full flex flex-row">
              <input
                type="radio"
                {...register("evaluator_status", { required: true })}
                className="radio radio-primary"
                value="Aktif"
                id="aktif"
                defaultChecked
              />
              <label htmlFor="aktif" className="ml-2 mr-4">
                Aktif
              </label>
              <input
                type="radio"
                {...register("evaluator_status", { required: true })}
                className="radio radio-primary"
                id="tidak_aktif"
                value="Tidak Aktif"
              />
              <label htmlFor="tidak_aktif" className="ml-2 mr-4">
                Tidak Aktif
              </label>
            </div>
          </div>
          {/* Input for evaluator status */}

          {/* Input for evaluator field */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_field" className="label-input-msa2 ">
              Bidang Penilai
            </label>
            <div className="w-full flex-col">
              <input
                id="evaluator_field"
                placeholder="e.g : Sains Marine, Kecerdasan Buatan"
                required
                className="input input-bordered w-full "
                {...register("evaluator_field", { required: true })}
              />
              {errors.evaluator_field && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan Bidang Penilai
                </p>
              )}
            </div>
          </div>
          {/* Input for  evaluator field */}

          {/* Input for evaluator appointment date */}
          <div className="flex  items-center">
            <div className="w-full flex-col">
              <DateUpdate
                name="evaluator_appointment_date"
                label="Tarikh Lantikan Penilai"
                register={register}
                onChange={(e) =>
                  setTarikhSurat2(dayjs(e.target.value).toDate())
                }
              />
            </div>
          </div>
          {/* Input for  evaluator  appointment date */}

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

export default RegisterEvaluator;
