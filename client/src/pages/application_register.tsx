/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useThemeStore } from "../utils/useThemeStore";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

interface Program {
  id: number;
  nama_program: string;
  fakulti: string;
}

const Application_register = () => {
  const { darkMode } = useThemeStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    // setValue,
  } = useForm({});
  const [listProgram, setListProgram] = useState<Program[]>([]);

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        "http://localhost:5000/pendaftaran-program/maklumat-program"
      );
      setListProgram(response.data);
      console.table(response.data[0]);
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (
        (key === "application_form" || key === "application_form") &&
        data[key].length > 0
      ) {
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
        `http://localhost:5000/rekod-akreditasi/permohonan-akreditasi`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Rekod Permohonan Dikemaskini!",
          text: "Rekod Permohonan Akreditasi Program Berjaya Dikemaskini!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href =
              "/akreditasi-program/senarai-permohonan-akreditasi/";
          }
        });
      })
      .catch((error) => {
        console.table(error.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Rekod Permohonan Akreditasi Program Tidak Berjaya Dikemaskini!",
          footer: 'Ralat :" ' + error.message,
        });
      });
  };

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   const formData = new FormData();
  //   for (const key in data) {
  //     if ((key === "minitJKPT" || key === "minitJKA") && data[key].length > 0) {
  //       formData.append(key, data[key][0]);
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  //   for (const [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }
  //   console.table(data);
  // };

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div className={`container mt-5 mx-auto  p-4`}>
      <h1 className="text-xl font-bold mt-4 mb-4">
        Permohonan Akreditasi Program
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>Permohonan Akreditasi Program</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          <div className="flex items-center w-full">
            <label htmlFor="program_id" className="label-input-msa">
              Program
            </label>
            <div className="w-full mb-4">
              <Controller
                name="program_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    unstyled
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    placeholder="Sila pilih program untuk permohonan akreditasi"
                    classNames={{
                      control: () =>
                        `select select-bordered w-full p-2 border rounded-lg ${
                          darkMode
                            ? "bg-base-200 border-gray-600 text-gray-300"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring focus:ring-primary`,

                      menu: () =>
                        `border shadow-md rounded-md mt-1 ${
                          darkMode
                            ? "bg-base-200 border-gray-600"
                            : "bg-white border-gray-300"
                        }`,

                      option: ({ isFocused, isSelected }) =>
                        `p-2 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white"
                            : isFocused
                            ? darkMode
                              ? "bg-primary/20 text-gray-300"
                              : "bg-gray-200 text-gray-900"
                            : darkMode
                            ? "bg-base-200 text-gray-300"
                            : "bg-white text-gray-900"
                        }`,

                      singleValue: () =>
                        `${darkMode ? "text-gray-300" : "text-gray-900"}`,
                    }}
                    options={listProgram.map((program) => ({
                      value: program.id,
                      label: program.nama_program,
                    }))}
                    value={
                      field.value
                        ? {
                            value: field.value,
                            label: listProgram.find(
                              (program) => program.id === field.value
                            )?.nama_program,
                          }
                        : null
                    }
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                  />
                )}
              />
            </div>
          </div>

          <input type="hidden" {...register("program_id")} />

          <DropdownUpdate
            label="Jenis Akreditasi"
            labelId="application_accreditation_type"
            defaultValue={"placeholder"}
            placeholderOptions="Pilih Jenis Akreditasi"
            options={["Full Acreditation (FA)", "Partial Acreditation (PA)"]}
            register={register}
          />

          <DateUpdate
            name="uploadDate"
            label="Tarikh Penghantaran Permohonan Akreditasi"
            register={register}
            defValue={new Date("YYYY-MM-DD")}
            className="mt-3"
            inputClassName="focus:ring-primary"
          />

          <div className="flex mb-4 items-center">
            <label htmlFor="name" className="label-input-msa">
              Borang Permohonan
            </label>
            <div className="w-full flex items-center">
              <input
                type="file"
                id="application_form"
                {...register("application_form", { required: true })}
                className="file-input file-input-bordered w-1/2"
              />
              {errors.application_path && (
                <p className="text-red-500 text-md mt-1 ml-4">
                  This field is required!
                </p>
              )}
            </div>
          </div>
          <input
            type="hidden"
            {...register("application_status")}
            defaultValue="pending"
          />

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
                  title: "Simpan Permohonan?",
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
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Application_register;
