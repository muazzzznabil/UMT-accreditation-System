/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaDollarSign,
  FaRegFileAlt,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { useThemeStore } from "../utils/useThemeStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";

interface feedback {
  nama_program: string;
  application_type: string;
  application_status: string;
  id: number;
  program_id: number;
  application_id: number;
  feedback_documents_path: string;
  comment: string;
  feedback_date: Date;
  is_fined: number;
}

const Maklumbalas_view = () => {
  const { id, program_id } = useParams();
  const [feedback, setFeedback] = useState<feedback | null>();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, control, setValue } = useForm();
  const { darkMode } = useThemeStore();
  const [komen, setKomen] = useState<any>("");

  // *fetch feedback info
  const getFeedback = async () => {
    try {
      const res = await axios.get<feedback[]>(
        `http://localhost:5000/mqa-feedback/get-application-info/${id}`
      );
      setFeedback(res.data[0]);
      setKomen(res.data[0]?.comment);
      console.log(res.data[0]);
      if (res.data[0]?.comment) {
        setValue("comment", res.data[0].comment);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal mendapatkan maklumat maklumbalas.",
        footer: `Error: ${error.message}`,
      });
    }
  };

  const deleteProgram = async (id?: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/mqa-feedback/maklumbalas-mqa/${id}/delete`
      );

      Swal.fire({
        title: "Dihapus!",
        text: "Maklumbalas berjaya dihapus.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href =
            "/akreditasi-program/senarai-permohonan-akreditasi/";
        }
      });
    } catch (error: unknown) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `Error: ${(error as Error).message}`,
      });
    }
  };
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
      .put(
        `http://localhost:5000/mqa-feedback/maklumbalas-mqa/${id}/edit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Permohonan Didaftarkan!",
          text: "Permohonan Akreditasi Program Berjaya Didaftarkan!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/maklumbalas-akreditasi/${id}/${program_id}/maklumat-maklumbalas`;
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

  //   *Testing the form
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.log(data);
  // };
  //   *Testing the form

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    if (feedback?.feedback_documents_path) {
      setValue("existingFeedback_path", feedback.feedback_documents_path);
    }
  }, [feedback, setValue]);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col h-screen duration-300">
      <h1 className="text-2xl font-medium mt-4 mb-4 ">
        Maklumat Maklumbalas Pihak MQA
      </h1>

      {/* <Breadcrumb /> */}
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
            <a href={`/akreditasi-program/senarai-permohonan-akreditasi/`}>
              Senarai Penilai Dalaman
            </a>
          </li>
          <li>Maklumat Penilai</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col  ${
            useThemeStore().darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          {" "}
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-lg mb-4">
                Nama Program :{" "}
                <span className="text-large font-semibold">
                  {feedback?.nama_program}
                </span>
              </h2>
              <h2 className="text-lg mb-4">
                Jenis Permohonan :{" "}
                <span className="text-large font-semibold">
                  {feedback?.application_type}
                </span>
              </h2>
              <h2 className="text-lg mb-4">
                Keputusan Permohonan :{" "}
                <span
                  className={`text-large font-semibold badge badge-soft badge-lg ${
                    feedback?.application_status === "approved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {feedback?.application_status}
                </span>
              </h2>
            </div>

            {!isEdit && (
              <div className="space-x-2">
                <button
                  className="btn btn-error gap-2 mb-4"
                  type="button"
                  onClick={() =>
                    Swal.fire({
                      title: "Padam Maklumbalas?",
                      text: `Anda pasti untuk padam Maklumbalas !`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Hapus",
                    }).then((result) => {
                      if (result.isConfirmed === true) {
                        deleteProgram(feedback?.application_id);
                        // console.log("deleted");
                      }
                    })
                  }
                >
                  <FaTrash className="text-white" />
                  <span className="text-white">Padam</span>
                </button>
                <button
                  className="btn btn-warning gap-2 mb-4"
                  onClick={() => setIsEdit(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span className="text-white">edit</span>
                </button>
              </div>
            )}
            {isEdit && (
              <div className="flex flex-row gap-4">
                <button className="btn btn-primary gap-2 mb-4" type="submit">
                  <FaSave className="size-4" />
                  <span className="text-white">save</span>
                </button>
                <button
                  className="btn btn-error gap-2 mb-4"
                  type="reset"
                  onClick={() => {
                    Swal.fire({
                      title: "Batal Kemaskini?",
                      text: "Anda pasti untuk Batal Kemaskini Maklumbalas !",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Batal",
                      cancelButtonText: "Tidak",
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setKomen(feedback?.comment);
                        setIsEdit(false);
                      }
                    });
                  }}
                >
                  <FaTimes className="size-4" />
                  <span className="text-white">cancel</span>
                </button>
              </div>
            )}
          </div>
          <div
            className={`card  ${
              useThemeStore().darkMode ? "bg-gray-700" : "bg-white"
            } shadow-md rounded-lg p-6`}
          >
            <h2 className="text-xl font-bold mb-12 text-center">
              Maklumat Maklumbalas
            </h2>
            {isEdit && (
              <>
                <div className="space-y-4">
                  {/* Comment */}
                  <div className="flex w-full">
                    <div className="flex w-1/4">
                      <FaCommentAlt className="text-gray-500 mr-2 mt-1.5" />
                      <label htmlFor="comment">Komen dan saranan : </label>
                    </div>
                    <Controller
                      name="comment"
                      control={control}
                      rules={{
                        required: false,
                      }}
                      defaultValue={feedback?.comment}
                      render={({ field: { onChange, value } }) => (
                        <textarea
                          // defaultValue="Jika ade sebarang komen atau catitan"
                          className={`${
                            isEdit ? "textarea" : ""
                          } resize-none h-20 w-full ml-5`}
                          onChange={(e) => {
                            onChange(e.target.value);
                            setKomen(e.target.value);
                          }}
                          value={value}
                          disabled={!isEdit}
                        />
                      )}
                    />
                  </div>
                  {/* Comment */}

                  {/* Dokumen */}
                  <div className="flex w-full items-center">
                    <div className="flex mr-8">
                      <FaRegFileAlt className="text-gray-500 mr-2 mt-1" />{" "}
                      <label htmlFor="comment">
                        Dokumen maklumbalas pihak MQA :{" "}
                      </label>
                    </div>
                    <div className="w-full ml-6">
                      {" "}
                      <input
                        type="file"
                        {...register("feedback_documents_path")}
                        id="feedback_documents_path"
                        className="file-input file-input-bordered  w-1/2 "
                      />
                    </div>
                  </div>
                  {/* Dokumen */}

                  <div className={`flex mb-4 items-center `}>
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <label className="w-1/4">Tarikh Maklumbalas :</label>
                    <div className="w-full">
                      <div className="flex flex-col">
                        <input
                          type="date"
                          id="feedback_date"
                          //  placeholder={placeholder}
                          {...register("feedback_date", { required: true })}
                          //  onChange={onChange}
                          defaultValue={
                            dayjs(feedback?.feedback_date)
                              ? dayjs(feedback?.feedback_date).format(
                                  "YYYY-MM-DD"
                                )
                              : ""
                          } // Use an empty string if defValue is not provided
                          className={`p-2 rounded ${
                            darkMode ? "bg-base-200" : "bg-white"
                          } w-1/2 ring-1 ring-gray-400`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Denda */}
                  <div className="flex mb-4 items-center">
                    <FaDollarSign
                      className={`mr-2 ${
                        feedback?.is_fined ? "text-red-500" : "text-green-500"
                      }`}
                    />
                    <label htmlFor="evaluator_status" className=" w-1/4">
                      Denda Dari Pihak MQA
                    </label>
                    <div className="w-full flex flex-row">
                      <input
                        type="radio"
                        {...register("is_fined", { required: true })}
                        className="radio radio-primary"
                        value="1"
                        id="ya"
                        defaultChecked={feedback?.is_fined ? true : false}
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
                        defaultChecked={feedback?.is_fined ? false : true}
                      />
                      <label htmlFor="tidak" className="ml-2 mr-4">
                        Tidak Didenda
                      </label>
                    </div>
                  </div>
                  {/* Denda */}
                </div>
              </>
            )}
            {!isEdit && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCommentAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Komen dan saranan : </p>
                  <p className="ml-2 font-medium text-lg">
                    {" "}
                    {/* {feedback?.comment} */}
                    {komen}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaRegFileAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Dokumen maklumbalas pihak MQA : </p>
                  <a
                    className="ml-2 font-medium text-lg link link-primary "
                    href={`http://localhost:5000${feedback?.feedback_documents_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {feedback?.feedback_documents_path.split("/").pop()}
                  </a>
                  <input type="hidden" {...register("existingFeedback_path")} />
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Tarikh maklumbalas : </p>
                  <p className="ml-2 font-medium text-lg">
                    {" "}
                    {dayjs(feedback?.feedback_date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaDollarSign
                    className={`text-gray-500 mr-2 ${
                      !feedback?.is_fined ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <p className="text-lg">Didenda : </p>
                  <p className="ml-2 font-medium text-lg">
                    {" "}
                    {feedback?.is_fined ? "Ya" : "Tidak"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Maklumbalas_view;
