/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaMoneyBillWave,
  FaRegFileAlt,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import dayjs from "dayjs";

interface payment {
  program_id: number;
  id: number;
  payment_id: number;
  payment_date: Date;
  payment_amount: number;
  payment_status: string;
  payment_proof_path: string;
  payment_type: string;
  payment_description: string;
  payment_method: string;
  records_timeStamp: Date;
}

const Payment_update = () => {
  const { payment_id, program_id, name } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const { darkMode } = useThemeStore();
  const [isEdit, setIsEdit] = useState(false);
  const [payment, setPayment] = useState<payment | null>(null);

  const getPaymentRecords = async () => {
    try {
      const response = await axios.get<payment[]>(
        `http://localhost:5000/payment-records/rekod-pembayaran/${payment_id}`
      );
      setPayment(response.data[0]);

      console.table(response.data[0]);
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteProgram = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/payment-records/rekod-pembayaran/${payment_id}/delete`
      );

      Swal.fire({
        title: "Dihapus!",
        text: "Maklumbalas berjaya dihapus.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/rekod-pembayaran/${program_id}/${name}`;
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
      if (key === "payment_proof_path" && data[key].length > 0) {
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
        `http://localhost:5000/payment-records/rekod-pembayaran/${payment_id}/edit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Kemaskini Berjaya!",
          text: "Kemaskini rekod Pembayaran Berjaya!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/rekod-pembayaran/${program_id}/${name}`;
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

  // !Testing Purpose
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.log(data);
  // };

  useEffect(() => {
    getPaymentRecords();
  }, []);

  useEffect(() => {
    if (payment?.payment_proof_path) {
      setValue("existingFeedback_path", payment?.payment_proof_path);
    }
  }, [payment, setValue]);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col h-screen duration-300">
      <h1 className="text-2xl font-medium mt-4 mb-4 ">
        Butiran Penuh Rekod Pembayaran
      </h1>

      {/* <Breadcrumb /> */}
      {/* Breadcrumbs */}
      <div className={`breadcrumbs text-md mb-4`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li>
          <li>
            <a href={`/rekod-pembayaran/${program_id}/${name}`}>
              Senarai Rekod Pembayaran Program
            </a>
          </li>
          <li>Maklumat Penilai</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`container  mb-32 mx-auto flex flex-col  ${
            useThemeStore().darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          {" "}
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-lg mb-4">
                Nama Program :{" "}
                <span className="text-large font-semibold">{name}</span>
              </h2>
              <h2 className="text-lg mb-4">
                Tarikh dan Masa Rekod Pembayaran Dibuat :{" "}
                <span className="text-large font-semibold">
                  {dayjs(payment?.records_timeStamp).format(
                    "DD/MM/YYYY hh:mm A"
                  )}
                </span>
              </h2>
              <h2 className="text-lg mb-4">
                Direkod Oleh :{" "}
                <span className="text-large font-semibold">USER</span>
              </h2>
            </div>

            {!isEdit && (
              <div className="space-x-2">
                <button
                  className="btn btn-error gap-2 mb-4"
                  type="button"
                  onClick={() =>
                    Swal.fire({
                      title: "Padam Rekod Pembayaran?",
                      text: `Anda pasti untuk padam Rekod Pembayaran !`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Hapus",
                    }).then((result) => {
                      if (result.isConfirmed === true) {
                        deleteProgram();
                        console.log("deleted");
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
                      text: "Anda pasti untuk Batal Kemaskini Rekod Pembayaran !",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Batal",
                      cancelButtonText: "Tidak",
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // setKomen(feedback?.comment);
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
              Butiran Rekod Pembayaran
            </h2>
            {isEdit && (
              <>
                <div className="space-y-4">
                  {/* Jenis Bayaran */}
                  <div className="flex w-full items-center">
                    <div className="flex w-1/4">
                      <FaRegFileAlt className="text-gray-500 mr-2 mt-1" />{" "}
                      <label htmlFor="comment" className="mr-2">
                        Jenis Pembayaran :{" "}
                      </label>
                    </div>
                    <div className="w-full ml-6">
                      {" "}
                      <select
                        {...register("payment_type")}
                        defaultValue={payment?.payment_type}
                        className={`select  select-bordered  w-1/2`}
                      >
                        <option value="Pembayaran Sijil Akreditasi">
                          Pembayaran Sijil Akreditasi
                        </option>
                        <option value="Bayaran Denda kepada Pihak MQA">
                          Bayaran Denda kepada Pihak MQA
                        </option>
                        <option value="Bayaran Lain-lain">
                          Bayaran Lain-lain
                        </option>
                      </select>
                    </div>
                  </div>
                  {/* Jenis Bayaran */}

                  {/* Jumnlah Bayaran */}
                  <div className="flex w-full items-center">
                    <div className="flex w-1/4 mr-6">
                      <FaMoneyBillWave className="text-gray-500 mr-2 mt-1" />{" "}
                      <label htmlFor="comment">Jumlah Bayaran : </label>
                    </div>
                    <div className="w-full flex flex-col">
                      <label className="input">
                        {"RM"}
                        <input
                          type="text"
                          id="payment_amount"
                          placeholder="e.g : 50.00"
                          required
                          defaultValue={payment?.payment_amount}
                          className="tabular-nums"
                          {...register("payment_amount", {
                            required: true,
                          })}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              e.target.value = value.toFixed(2); // Format to 2 decimal places
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  {/* Jumnlah Bayaran */}

                  {/* Tarikh bayaran */}
                  <div className={`flex mb-4 items-center `}>
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <label className="w-1/4">Tarikh Bayaran Dibuat :</label>
                    <div className="w-full">
                      <div className="flex flex-col">
                        <input
                          type="date"
                          id="payment_date"
                          //  placeholder={placeholder}
                          {...register("payment_date", { required: true })}
                          //  onChange={onChange}
                          defaultValue={
                            dayjs(payment?.payment_date)
                              ? dayjs(payment?.payment_date).format(
                                  "YYYY-MM-DD"
                                )
                              : ""
                          }
                          className={`p-2 rounded ${
                            darkMode ? "bg-base-200" : "bg-white"
                          } w-1/2 ring-1 ring-gray-400`}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Tarikh bayaran */}

                  {/* Cara Pembayaran */}
                  <div className="flex w-full items-center">
                    <div className="flex  w-1/4">
                      <FaRegFileAlt className="text-gray-500 mr-2 mt-1" />{" "}
                      <label htmlFor="comment">Cara Pembayaran : </label>
                    </div>
                    <div className="w-full ml-6">
                      {" "}
                      <select
                        {...register("payment_method")}
                        defaultValue={payment?.payment_method}
                        className={`select  select-bordered  w-1/2`}
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit Card">Credit Card </option>
                        <option value="Debit Card">Debit Card</option>
                      </select>
                    </div>
                  </div>
                  {/* Cara Pembayaran */}

                  {/* Dokumen */}
                  <div className="flex w-full items-center">
                    <div className="flex  w-1/4">
                      <FaRegFileAlt className="text-gray-500 mr-2 mt-1" />{" "}
                      <label htmlFor="comment">Bukti Pembayaran : </label>
                    </div>
                    <div className="w-full ml-6">
                      {" "}
                      <input
                        type="file"
                        {...register("payment_proof_path")}
                        id="payment_proof_path"
                        className="file-input file-input-bordered  w-1/2 "
                      />
                    </div>
                  </div>
                  {/* Dokumen */}

                  {/* Comment */}
                  <div className="flex w-full">
                    <div className="flex w-1/4">
                      <FaCommentAlt className="text-gray-500 mr-2 mt-1.5" />
                      <label htmlFor="payment_description">
                        Catatan Pembayaran :{" "}
                      </label>
                    </div>
                    <div className="w-full ml-6">
                      {" "}
                      <input
                        type="text"
                        {...register("payment_description")}
                        id="payment_description"
                        className="input input-bordered w-1/2"
                        defaultValue={payment?.payment_description}
                      />
                    </div>
                  </div>
                  {/* Comment */}
                </div>
              </>
            )}
            {!isEdit && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCommentAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Jenis Pembayaran : </p>
                  <p className="ml-2 font-medium text-lg">
                    {payment?.payment_type}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCommentAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Jumlah Bayaran : </p>
                  <p className="ml-2 font-medium text-lg">
                    {payment?.payment_amount}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Tarikh Bayaran Dibuat : </p>
                  <p className="ml-2 font-medium text-lg">
                    {" "}
                    {dayjs(payment?.payment_date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCommentAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Cara Pembayaran : </p>
                  <p className="ml-2 font-medium text-lg">
                    {payment?.payment_method}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaRegFileAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Bukti Pembayaran : </p>
                  <a
                    className="ml-2 font-medium text-lg link link-primary "
                    href={`http://localhost:5000${payment?.payment_proof_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {payment?.payment_proof_path}
                  </a>
                  <input type="hidden" {...register("existingFeedback_path")} />
                </div>
                <div className="flex items-center">
                  <FaCommentAlt className="text-gray-500 mr-2" />
                  <p className="text-lg">Catatan Pembayaran : </p>
                  <p className="ml-2 font-medium text-lg">
                    {payment?.payment_description
                      ? payment?.payment_description
                      : "-"}
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

export default Payment_update;
