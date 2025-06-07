/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useThemeStore } from "../utils/useThemeStore";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

interface application {
  id: number;
  program_id: number;
  program_name: string;
  application_status: string;
  application_type: string;
  application_path: string;
  application_submission_date: Date;
}

const Application_update = () => {
  const { darkMode } = useThemeStore();
  const { id, nama_program } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const [listProgram, setListProgram] = useState<application | null>(null);

  const getApplication = async () => {
    try {
      const response = await axios.get<application[]>(
        `http://localhost:5000/rekod-akreditasi/permohonan-akreditasi/${id}/edit`
      );
      setListProgram(response.data[0]);
      console.table(response.data[0]);
      // setNotPending(response.data[0].application_status);

      console.log(response.data[0].application_submission_date);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "application_form" && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .put(
        `http://localhost:5000/rekod-akreditasi/permohonan-akreditasi/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Permohonan Didaftarkan!",
          text: "Permohonan Akreditasi Program Berjaya Didaftarkan!",
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
          text: "Permohonan Akreditasi Program Tidak Berjaya Didaftarkan!",
          footer: 'Ralat :" ' + error.message,
        });
      });
  };

  //
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //     console.table(data);
  //   };

  useEffect(() => {
    getApplication();
    // setNotPending(listProgram?.application_status);
  }, []);

  // Render a loading state until listProgram is populated
  if (!listProgram) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container mt-5 mx-auto  p-4`}>
      <h1 className="text-xl font-medium mt-4 mb-4">
        Kemaskini Permohonan Akreditasi :{" "}
        <span className="font-bold">{nama_program}</span>
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/akreditasi-program/senarai-permohonan-akreditasi/">
              Senarai Permohonan Akreditasi Program
            </a>
          </li>

          <li>Kemaskini Permohonan Akreditasi </li>
        </ul>
      </div>

      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          <input type="hidden" defaultValue={id} {...register("program_id")} />

          <h2 className="mb-6 text-xl font-semibold">{nama_program}</h2>

          <DropdownUpdate
            label="Jenis Akreditasi"
            labelId="application_accreditation_type"
            defaultValue={listProgram.application_type}
            placeholderOptions="Pilih Jenis Akreditasi"
            options={[
              "Full Acreditation (FA)",
              "Provisional Acreditation (PA)",
              "Compliance Accreditation (CA)",
            ]}
            register={register}
          />

          <DateUpdate
            name="uploadDate"
            label="Tarikh Penghantaran Permohonan Akreditasi"
            register={register}
            defValue={listProgram.application_submission_date}
            className="mt-3"
            inputClassName="focus:ring-primary"
          />
          {/* Docs Application Update */}
          <div className="flex mb-4 items-center">
            <label htmlFor="name" className="label-input-msa">
              Borang Permohonan
            </label>
            <div className="w-full flex items-center">
              <input
                type="file"
                id="application_form"
                {...register("application_form")}
                className="file-input file-input-bordered w-1/2"
              />

              <a
                className="link link-primary ml-2"
                target="_blank"
                href={`http://localhost:5000${listProgram.application_path}`}
                rel="noopener noreferrer"
              >
                {listProgram.application_path.split("/")[3]}
              </a>
              {errors.application_path && (
                <p className="text-red-500 text-md mt-1 ml-4">
                  This field is required!
                </p>
              )}
            </div>
          </div>
          {/* Docs Application Update */}

          <div className="mb-8">
            <DropdownUpdate
              label="Status Permohonan"
              labelId="application_status"
              defaultValue={listProgram.application_status}
              placeholderOptions="Pilih Status Permohonan"
              options={["pending", "rejected", "approved"]}
              register={register}
              className="w-1/2  "
              // onChange={(e) => setNotPending(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <div className="flex space-x-4 justify-end">
            <input
              type="reset"
              value="Reset"
              className="btn btn-error shadow-md text-white"
              onChange={() => {
                // setNotPending(listProgram.application_status);
              }}
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
          {/* Action Button */}
        </div>
        <input
          type="hidden"
          {...register("existingApplication_path")}
          value={listProgram.application_path}
        />
      </form>
    </div>
  );
};

export default Application_update;
