/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import DateUpdate from "../components/msaForm/DateUpdate";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import LabelWrapper from "../components/LabelWrapper";
import { usePageState } from "../utils/usePageState";

interface permohonan {
  id: number;
  program_id: number;
  application_id: number;
  application_type: string;
  application_submission_date: Date;
  application_status: string;
}

const Payment_register = () => {
  const { id, name } = useParams();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const [permohonanList, setPermohonanList] = useState<permohonan[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const themeStore = useThemeStore();
  // const navigate = useNavigate();
  const pageState = usePageState();

  const getApplicationList = async () => {
    try {
      const response = await axios.get<permohonan[]>(
        `${VITE_DATABASE_HOST}/payment-records/senarai-permohonan-akreditasi/${id}`
      );
      setPermohonanList(response.data);
      console.table(response.data);
    } catch (error) {
      console.error("Error fetching accreditation application:", error);
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
      .post(
        `${VITE_DATABASE_HOST}/payment-records/rekod-pembayaran`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Pembayaran berjaya direkodkan!",
          text: "Rekod Bayaran Program Berjaya Direkodkan!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.href = `/rekod-pembayaran/${id}/${name}`;
            pageState.setCurrentPage(5);
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

  // *Testing Submission Value
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };
  // *Testing Submission Value

  useEffect(() => {
    getApplicationList();
  }, []);

  if (!permohonanList) {
    return <div className="text-center ">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col  duration-300 ">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Tambah Rekod Pembayaran Program:{" "}
        <span className="font-bold">{name}</span>
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
            <a href={`/rekod-pembayaran/${id}/${name}`}>
              Senarai Rekod Pembayaran Program
            </a>
          </li>
          <li>Daftar Rekod Pembayaran</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <input type="hidden" {...register("program_id")} value={id} />
        <input type="hidden" {...register("application_id")} />
        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          <LabelWrapper
            label="Bayaran Untuk"
            labelId="application_id"
            className="mb-4 w-1/2"
          >
            <select
              id="application_id"
              className="select select-bordered w-1/2"
              {...register("application_id", {
                required: true,
              })}
            >
              <option
                value=""
                disabled
                hidden
                selected
                className="text-gray-400"
              >
                Pilih Permohonan yang sudah dinilai
              </option>
              {permohonanList.map((item) => (
                <option key={item.id} value={item.id}>{`${
                  item.application_type
                } - ${dayjs(item.application_submission_date).format(
                  "DD/MM/YYYY"
                )} (${item.application_status})`}</option>
              ))}

              {permohonanList.length === 0 && (
                <option disabled selected className="text-gray-400">
                  Tiada Permohonan yang sudah dinilai
                </option>
              )}
            </select>
          </LabelWrapper>

          {/* payment type */}
          <DropdownUpdate
            label="Jenis Pembayaran"
            labelId="payment_type"
            options={[
              "Bayaran Denda kepada Pihak MQA",
              "Pembayaran Sijil Akreditasi",
              "Bayaran Lain-lain",
            ]}
            register={register}
            defaultValue={"placeholder"}
            placeholderOptions="Pilih Jenis Pembayaran"
            className="mb-4 w-1/2 mt-4"
          />
          {/* payment type */}

          {/* jumlah bayaran */}
          <div className="flex mb-4 items-center">
            <label htmlFor="payment_amount" className="label-input-msa2">
              Jumlah Bayaran
            </label>
            <div className="w-full flex flex-col">
              <label className="input">
                {"RM"}
                <input
                  type="text"
                  id="payment_amount"
                  placeholder="e.g : 50.00"
                  required
                  className="tabular-nums"
                  {...register("payment_amount", {
                    required: true,
                    // pattern: /^\d+(\.\d{1,2})?$/, // Validate currency format
                  })}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      e.target.value = value.toFixed(2); // Format to 2 decimal places
                    }
                  }}
                />
              </label>
              {/* {errors.payment_amount?.type === "pattern" && (
                <p className="text-red-500 text-xs mt-1">
                  Format Jumlah Tidak Sah e.g. 50.00
                </p>
              )} */}
              {errors.payment_amount && (
                <p className="text-red-500 text-xs mt-1">
                  Sila Isikan Jumlah Bayaran
                </p>
              )}
            </div>
          </div>
          {/* jumlah bayaran */}

          <DateUpdate
            name="payment_date"
            label="Tarikh Bayaran Dibuat"
            register={register}
          />

          <DropdownUpdate
            labelId="payment_method"
            label="Cara Pembayaran"
            options={["Jom Pay", "FPX", "Bank Transfer", "Duit Now"]}
            placeholderOptions="Pilih Cara Pembayaran"
            register={register}
            defaultValue={"placeholder"}
            className="mb-4 "
          />

          {/*  payment proof */}
          <div className="flex mb-4 items-center">
            <label htmlFor="name" className="label-input-msa">
              Bukti Pembayaran
            </label>
            <div className="w-full flex items-center">
              <input
                type="file"
                id="payment_proof_path"
                {...register("payment_proof_path")}
                className="file-input file-input-bordered w-1/2"
              />

              {errors.application_path && (
                <p className="text-red-500 text-md mt-1 ml-4">
                  This field is required!
                </p>
              )}
            </div>
          </div>
          {/*  payment proof */}

          {/* Remarks */}
          <div className="flex mb-4 items-center">
            <label htmlFor="payment_description" className="label-input-msa2 ">
              Catatan Pembayaran
            </label>
            <div className="w-full flex-col">
              <input
                id="payment_description"
                placeholder="Jika ada..."
                required
                className="input input-bordered w-full "
                {...register("payment_description")}
              />
            </div>
          </div>
          {/* Input for Name */}

          <div className="flex space-x-4 justify-end">
            <input
              type="reset"
              value="Batal"
              className="btn btn-error shadow-md text-white"
              onClick={() => {
                // navigate(-1);
                pageState.setCurrentPage(5);
              }}
            />
            <button
              type="submit"
              className="btn btn-primary shadow-md text-white"
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Simpan Rekod Pembayaran?",
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

export default Payment_register;
