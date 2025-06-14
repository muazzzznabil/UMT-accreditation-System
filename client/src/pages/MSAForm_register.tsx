/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import KKMUpdate from "../components/msaForm/KKMUpdate";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import SepenuhMasa from "../components/msaForm/SepenuhMasa";
import SeparuhMasa from "../components/msaForm/SeparuhMasa";
import KerjasamaUpdate from "../components/msaForm/kerjasamaUpdate";
import DateUpdate from "../components/msaForm/DateUpdate";
import SahLaku from "../components/msaForm/SahSehinggaUpdate";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Slide, toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { useThemeStore } from "../utils/useThemeStore";
import classNames from "classnames";

const MSAForm_register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const themeStore = useThemeStore();
  const [tarikhSurat2, setTarikhSurat2] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("Maklumat Program");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (label: string) => {
    setActiveTab(label);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormSubmitted(false); // Reset before submit
    const formData = new FormData();
    for (const key in data) {
      if ((key === "minitJKPT" || key === "minitJKA") && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(
        `http://localhost:5000/pendaftaran-program/maklumat-program`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Program Registered!",
          text: "Program is successfully registered!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/program-list";
          }
        });
      })
      .catch((error) => {
        console.table(error.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Program Tidak Berjaya Didaftarkan!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };

  useEffect(() => {
    if (formSubmitted && Object.keys(errors).length > 0) {
      if (errors.bilMesyuarat && errors.bilMesyuarat.type === "pattern") {
        toast.error("Format Bil Mesyuarat is invalid!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Please fill in all required fields!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    // eslint-disable-next-line
  }, [errors, formSubmitted]);

  // Helper to show error message for required fields
  const renderError = (field: string, label?: string) => {
    if (errors[field]?.type === "required") {
      return (
        <span className="text-red-500 text-xs ml-2">
          {label || "Field"} is required!
        </span>
      );
    }
    return null;
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit((data) => {
        setFormSubmitted(true);
        onSubmit(data);
      })}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div
        className={`container mx-auto mt-5 font-sans flex flex-col h-auto  ${
          activeTab === "Maklumat Program" ? "h-auto" : "h-auto"
        }`}
      >
        <h1 className="text-xl  font-bold">Permohonan Program Baharu</h1>
        <div className="breadcrumbs text-md mb-2">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>Daftar Program Baru (MSA)</li>
          </ul>
        </div>
        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          <div role="tablist" className="tabs tabs-border justify-center">
            <input
              type="radio"
              name="my_tabs_3"
              // id="tab1"
              className="tab mb-10"
              aria-label="Maklumat Program"
              checked={activeTab === "Maklumat Program"}
              onChange={() => handleTabChange("Maklumat Program")}
            />
            <div className="tab-content">
              <div className="w-full space-y-4">
                <div className="flex mb-4 items-center">
                  <label htmlFor="nama_program" className="label-input-msa ">
                    Nama Program
                  </label>
                  <input
                    id="nama_program"
                    placeholder="Sila Masukkan Nama Program"
                    required
                    className={classNames("input input-bordered w-full", {
                      "border-red-500": errors.nama_program,
                    })}
                    {...register("nama_program", { required: true })}
                  />
                  {renderError("nama_program", "Nama Program")}
                </div>
                <KKMUpdate
                  //   valueMQF={program.tahapMQF}
                  //   valueSektorAkademik={program.sektorAkademik}
                  register={register}
                />
                {/* Code Nec */}
                <div className="flex items-center w-full">
                  <label htmlFor="code_nec" className="label-input-msa">
                    Code Nec
                  </label>
                  <div className="w-full">
                    <Controller
                      name="code_nec"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <>
                          <Select
                            {...field}
                            unstyled
                            components={{
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }}
                            placeholder="Sila Pilih Code NEC"
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
                                  themeStore.darkMode
                                    ? "text-gray-300"
                                    : "text-gray-900"
                                }`,
                            }}
                            options={Nec_Code_List.map((code) => ({
                              value: code,
                              label: code,
                            }))}
                            value={
                              field.value
                                ? Nec_Code_List.find((c) => c === field.value)
                                  ? { value: field.value, label: field.value }
                                  : null
                                : null
                            }
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption?.value)
                            }
                          />
                          {renderError("code_nec", "Code NEC")}
                        </>
                      )}
                    />
                  </div>
                </div>
                {/* Code Nec */}
                {/* <DropdownUpdate
                  label={"Code NEC"}
                  options={Nec_Code_List}
                  labelId={"code_nec"}
                  defaultValue={"placeholder"}
                  placeholderOptions={"Sila Pilih Code NEC"}
                  register={register}
                /> */}
                <DropdownUpdate
                  label={"Mode Penawaran"}
                  options={mod_penawaran}
                  labelId={"mode_penawaran"}
                  defaultValue={"placeholder"}
                  placeholderOptions={"Sila Pilih Mode Penawaran"}
                  register={register}
                />
                {renderError("mode_penawaran", "Mode Penawaran")}
                <DropdownUpdate
                  label={"Fakulti"}
                  options={fakulti_List}
                  labelId={"fakulti"}
                  defaultValue={"placeholder"}
                  placeholderOptions={"Sila Pilih Fakulti"}
                  register={register}
                />
                <SepenuhMasa
                  register={register}
                  Sepenuh_LatihanIndustri_Semester={"placeholder"}
                  Sepenuh_SemesterPendek_Semester="placeholder"
                  Sepenuh_SemesterPanjang_Semester="placeholder"
                  Sepenuh_min_Minggu="placeholder"
                  Sepenuh_min_Semester="placeholder"
                  Sepenuh_min_Tahun="placeholder"
                  Sepenuh_max_Minggu="placeholder"
                  Sepenuh_max_Semester="placeholder"
                  Sepenuh_max_Tahun="placeholder"
                />
                <SeparuhMasa register={register} />
                <div className="flex w-full items-center">
                  <label htmlFor="mod_penyampaian" className="label-input-msa">
                    Mod Penyampaian
                  </label>
                  <div className="w-full flex justify-between">
                    <div className="flex items-start ">
                      <div className="inline-flex items-center mr-4">
                        <input
                          type="checkbox"
                          id="konvensional"
                          {...register("konvensional", { required: true })}
                          className={classNames("checkbox mr-2", {
                            "border-red-500": errors.konvensional,
                          })}
                        />
                        <label htmlFor="konvensional" className=" text-md">
                          Konvensional/Terbuka
                        </label>
                      </div>
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="ODL"
                          {...register("ODL", { required: true })}
                          className={classNames("checkbox mr-2", {
                            "border-red-500": errors.ODL,
                          })}
                        />
                        <label htmlFor="ODL" className=" text-md">
                          Jarak Jauh (ODL)
                        </label>
                      </div>
                    </div>
                  </div>
                  {renderError("konvensional", "Konvensional/Terbuka")}
                  {renderError("ODL", "Jarak Jauh (ODL)")}
                </div>
                <DropdownUpdate
                  label={"Struktur Program"}
                  options={struktur_program}
                  labelId={"struktur_program"}
                  defaultValue={"placeholder"}
                  placeholderOptions={"Sila Pilih Struktur Program"}
                  register={register}
                />
                <KerjasamaUpdate
                  register={register}
                  programKerjasama="placeholder"
                  jenisKerjasama="placeholder"
                />
              </div>
            </div>
            {/* mesy jkpt */}
            <input
              type="radio"
              name="my_tabs_3"
              className="tab"
              aria-label="Mesyuarat JKPT"
              checked={activeTab === "Mesyuarat JKPT"}
              onChange={() => handleTabChange("Mesyuarat JKPT")}
            />
            <div className="tab-content">
              <DateUpdate
                name="tarikhSurat"
                label="Tarikh Surat"
                placeholder="Tarikh Surat"
                register={register}
                onChange={(e) =>
                  setTarikhSurat2(dayjs(e.target.value).toDate())
                }
              />
              <DateUpdate
                name="tarikhTerimaSurat"
                label="Tarikh Terima Surat"
                register={register}
                placeholder="Tarikh Terima Surat"
              />
              <DateUpdate
                name="tarikhMesyuarat"
                label="Tarikh Mesyuarat"
                placeholder="Tarikh Mesyuarat"
                register={register}
              />
              <SahLaku
                register={register}
                setValue={setValue}
                tarikhSurat={dayjs(tarikhSurat2).toDate()}
              />
              {/* Bil Mesyuarat */}
              <div className="flex mb-4 items-center">
                <label htmlFor="bilMesyuarat" className="label-input-msa">
                  Bil Mesyuarat JKPT
                </label>
                <div className="w-full flex items-center ">
                  <input
                    type="text"
                    id="bilMesyuarat"
                    {...register("bilMesyuarat", {
                      required: true,
                      pattern: /^[0-9]+\/[0-9]{4}$/,
                    })}
                    className={classNames("input input-bordered w-1/6 mt-4", {
                      "border-red-500": errors.bilMesyuarat,
                    })}
                    placeholder=" Bil. / Tahun"
                  />
                  {errors.bilMesyuarat &&
                    errors.bilMesyuarat.type === "pattern" && (
                      <p className="text-red-500 text-md mt-1 ml-4">
                        Format haruslah seperti :{" "}
                        <span className="font-semibold">" Bil./Tahun "</span>
                      </p>
                    )}
                  {renderError("bilMesyuarat", "Bil Mesyuarat JKPT")}
                </div>
              </div>
              {/* Bil Mesyuarat */}
              {/* Muat Naik Surat */}
              <div className="flex mb-4 items-center">
                <label htmlFor="name" className="label-input-msa">
                  Minit JKPT
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    id="minitJKPT"
                    {...register("minitJKPT", { required: true })}
                    className={classNames(
                      "file-input file-input-bordered w-1/2",
                      { "border-red-500": errors.minitJKPT }
                    )}
                  />
                  {renderError("minitJKPT", "Minit JKPT")}
                </div>
              </div>
            </div>{" "}
            {/* Muat Naik Surat */}
            {/* Mesyuarat JKA */}
            <input
              type="radio"
              name="my_tabs_3"
              className="tab"
              aria-label="Mesyuarat JKA"
              checked={activeTab === "Mesyuarat JKA"}
              onChange={() => handleTabChange("Mesyuarat JKA")}
            />
            <div className="tab-content ">
              <DateUpdate
                name="tarikMesyJKA"
                label="Tarikh Mesyuarat JKA"
                register={register}
              />
              {/* Bil Mesyuarat */}
              <div className="flex mb-4 items-center">
                <label htmlFor="bilMesyuaratJKA" className="label-input-msa">
                  Bil Mesyuarat JKA
                </label>
                <div className="w-full flex items-center ">
                  <input
                    type="text"
                    id="bilMesyuaratJKA"
                    required
                    {...register("bilMesyuaratJKA", {
                      required: true,
                      pattern: /^[0-9]+\/[0-9]{4}$/,
                    })}
                    className={classNames("input input-bordered w-1/6", {
                      "border-red-500": errors.bilMesyuaratJKA,
                    })}
                    placeholder=" Bil. / Tahun"
                  />
                  {errors.bilMesyuaratJKA &&
                    errors.bilMesyuaratJKA.type === "pattern" && (
                      <p className="text-red-500 text-md mt-1 ml-4">
                        Format haruslah seperti :{" "}
                        <span className="font-semibold">" Bil./Tahun "</span>
                      </p>
                    )}
                  {renderError("bilMesyuaratJKA", "Bil Mesyuarat JKA")}
                </div>
              </div>
              {/* Bil Mesyuarat */}
              {/* Muat Naik Surat */}
              <div className="flex mb-4 items-center">
                <label htmlFor="name" className="label-input-msa">
                  Minit JKA
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    id="minitJKA"
                    {...register("minitJKA", { required: true })}
                    className={classNames(
                      "file-input file-input-bordered w-1/2",
                      { "border-red-500": errors.minitJKA }
                    )}
                  />
                  {renderError("minitJKA", "Minit JKA")}
                </div>
              </div>
            </div>{" "}
          </div>
          {/* Action Button  */}
          <div
            className={`flex space-x-4 justify-end mt-4 ${
              activeTab != "Mesyuarat JKA" && "hidden"
            }`}
          >
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
                setFormSubmitted(true);
                Swal.fire({
                  title: "Simpan Permohonan Program?",
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
      </div>
    </form>
  );
};

export default MSAForm_register;
