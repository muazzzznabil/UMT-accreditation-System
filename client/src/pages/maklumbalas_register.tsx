/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import { useThemeStore } from "../utils/useThemeStore";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface getInfo {
  nama_program: string;
  application_type: string;
  application_status: string;
}
const Maklumbalas_register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({});

  const themeStore = useThemeStore();
  const { id, program_id } = useParams();
  const [appInfo, setAppInfo] = useState<getInfo>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "feedback_documents_path" && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(`http://localhost:5000/mqa-feedback/maklumbalas-mqa`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

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

  const getProgramInfo = async () => {
    try {
      const res = await axios.get<getInfo[]>(
        `http://localhost:5000/mqa-feedback/get-info/${id}`
      );
      console.log(res.data);
      setAppInfo(res.data[0]);
    } catch (error: any) {
      console.error("Error fetching program info:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch program information.",
        footer: `Error: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    getProgramInfo();
  }, []);

  //   *Testing the form
  //   const onSubmit: SubmitHandler<any> = async (data) => {
  //     console.table(data);
  //   };
  //   *Testing the form

  return (
    <div className="container mt-5 mx-auto h-screen p-4">
      <h1 className="text-2xl font-bold">Maklumbalas Pihak MQA</h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-4">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/akreditasi-program/senarai-permohonan-akreditasi/">
              Senarai Permohonan Akreditasi
            </a>
          </li>
          <li>Maklumbalas Pihak MQA</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-base-200" : "bg-white"
          } p-6 rounded-md shadow-md `}
        >
          <input type="hidden" {...register("program_id")} value={program_id} />
          <input type="hidden" {...register("application_id")} value={id} />
          <h2 className="text-xl mb-2 font-bold">
            Pemerhatian dan respons daripada pihak MQA
          </h2>
          <h3 className="text-lg ">
            Program : <span className="font-bold">{appInfo?.nama_program}</span>
          </h3>
          <h3 className="text-lg ">
            Jenis Akreditasi :{" "}
            <span className="font-bold">{appInfo?.application_type}</span>
          </h3>
          <h3 className="text-lg ">
            Keputusan Permohonan :{" "}
            <span
              className={`font-bold badge ${
                appInfo?.application_status === "rejected"
                  ? "badge-error"
                  : "badge-success"
              } badge-soft badge-lg`}
            >
              {appInfo?.application_status}
            </span>
          </h3>
          <div className="divider mb-8"></div>
          <div className="flex mb-4">
            <label htmlFor="comment" className="label-input-msa">
              Komen atau Catitan
            </label>
            <Controller
              name="comment"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, value } }) => (
                <textarea
                  placeholder="Jika ade sebarang komen atau catitan"
                  className="textarea resize-none h-20 w-full "
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>{" "}
          {/*  Feedback Docs */}
          <div className="flex mb-4 items-center">
            <label htmlFor="name" className="label-input-msa">
              Maklumbalas Pihak MQA
            </label>
            <div className="w-full flex items-center">
              <input
                type="file"
                id="feedback_documents_path"
                {...register("feedback_documents_path")}
                className="file-input file-input-bordered w-1/2"
              />

              {errors.application_path && (
                <p className="text-red-500 text-md mt-1 ml-4">
                  This field is required!
                </p>
              )}
            </div>
          </div>
          {/*  Feedback Docs */}
          <DateUpdate
            name="feedback_date"
            label="Tarikh Maklumbalas"
            register={register}
            required={true}
          />
          {errors.feedback_date && (
            <div className="toast toast-top toast-end top-25 ">
              <div className="alert alert-error">
                <span>
                  <FaExclamationCircle className="inline mr-2" /> The date field
                  is required.
                </span>
              </div>
            </div>
          )}
          {/* MQA Fine */}
          <div className="flex mb-4 items-center">
            <label htmlFor="evaluator_status" className="  label-input-msa2">
              Denda Dari Pihak MQA
            </label>
            <div className="w-full flex flex-row">
              <input
                type="radio"
                {...register("is_fined", { required: true })}
                className="radio radio-primary"
                value="1"
                id="ya"
                defaultChecked
              />
              <label htmlFor="ya" className="ml-2 mr-4">
                Didenda
              </label>
              <input
                type="radio"
                {...register("is_fined", { required: true })}
                className="radio radio-primary"
                id="tidak"
                value="0"
              />
              <label htmlFor="tidak" className="ml-2 mr-4">
                Tidak Didenda
              </label>
            </div>
          </div>
          {/* MQA Fine */}
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
        </div>
      </form>
    </div>
  );
};

export default Maklumbalas_register;
