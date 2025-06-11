/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import LabelWrapper from "../components/LabelWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

interface accreditation {
  accreditation_id: number;
  program_id: number;
  accreditationStartDate: Date;
  accreditationEndDate: Date;
  accreditationStatus: string;
  accreditationFilePath: string;
  application_type: string;
  program_start_date: Date;
  program_end_date: Date;
  no_mqa: string;
}

const AccreditationRecords_update = () => {
  const { id, nama_program } = useParams();
  const themeStore = useThemeStore();
  const navigate = useNavigate();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const [accreditations, setAccreditations] = useState<accreditation | null>(
    null
  );
  const [tarikhAkhir, setTarikhAkhir] = useState<string | null>(
    dayjs(accreditations?.accreditationEndDate).format("DD MMMM YYYY")
  );
  const [tarikhMulaProgram, setTarikhMulaProgram] = useState<Date | null>(
    accreditations?.program_start_date
      ? dayjs(accreditations.program_start_date).toDate()
      : null
  );
  const {
    register,
    // formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({});
  const getAccreditations = async () => {
    const response = await axios.get<accreditation[]>(
      `${VITE_DATABASE_HOST}/rekod-akreditasi/tambah-akreditasi/${id}/program`
    );
    setAccreditations(response.data[0]);
    setValue(
      "existingApplication_path",
      response.data[0].accreditationFilePath
    );
    setValue(
      "accreditationEndDate",
      dayjs(response.data[0].accreditationEndDate).format("YYYY-MM-DD")
    );

    // console.table(response.data[0]);
    if (response.data[0]?.accreditationEndDate) {
      setTarikhAkhir(
        dayjs(response.data[0].accreditationEndDate).format("DD MMMM YYYY")
      );
    }
  };

  useEffect(() => {
    getAccreditations();
  }, []);

  if (!accreditations) {
    return <div>Loading...</div>; // Delay rendering until data is loaded
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "accreditationFilePath" && data[key].length > 0) {
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
        `${VITE_DATABASE_HOST}/rekod-akreditasi/tambah-akreditasi/${id}/edit`,
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
            // window.location.href = `/akreditasi-program/${accreditations.program_id}/${nama_program}`;
            window.history.back();
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

  // !TESTING
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };

  return (
    <div className="container mx-auto mt-5  p-4">
      <h1 className="text-xl font-bold  mb-4">Kemaskini Rekod Akreditasi</h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-4">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>Kemaskini Rekod Akreditasi</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <div
        className={`container mt-12 mb-32 mx-auto flex flex-col  ${
          themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 rounded-md shadow-md`}
      >
        <h2 className="text-lg mb-4">
          Nama Program :{" "}
          <span className="text-large font-semibold">{nama_program}</span>
        </h2>
        <h2 className="text-lg mb-4">
          Jenis Akreditasi :{" "}
          <span className="text-large font-semibold">
            {accreditations.application_type}
          </span>
        </h2>{" "}
        <div
          className={`container mx-auto flex flex-col ${
            themeStore.darkMode ? "bg-base-200" : "bg-white"
          } p-6 rounded-md shadow-md `}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("accreditationEndDate")} />
            <input
              type="hidden"
              {...register("existingApplication_path")}
              value={accreditations.accreditationFilePath}
            />

            <DateUpdate
              name="accreditationStartDate"
              label="Tarikh Mula Akreditasi"
              register={register}
              defValue={accreditations.accreditationStartDate}
              className="mt-3"
              onChange={(e) => {
                setValue(
                  "accreditationEndDate",
                  dayjs(e.target.value).add(5, "year").format("YYYY-MM-DD")
                );
                setTarikhAkhir(
                  dayjs(e.target.value).add(5, "year").format("DD MMMM YYYY")
                );
              }}
            />

            <LabelWrapper
              label="Tarikh Tamat Akreditasi"
              labelId="accreditationEndDate"
              containerClass="mb-4"
            >
              <p className="ml-2"> {tarikhAkhir}</p>
            </LabelWrapper>

            <LabelWrapper
              label="Sijil Akreditasi"
              labelId="accreditationFilePath"
            >
              <input
                type="file"
                {...register("accreditationFilePath")}
                id="statusAkrditasi"
                className=" file-input w-1/2 "
              />
              <a
                href={`http://localhost:5000${accreditations.accreditationFilePath}`}
                className="link link-primary ml-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                {accreditations.accreditationFilePath.split("/").pop()}
              </a>
            </LabelWrapper>

            <LabelWrapper label="No. MQA" labelId="no_mqa">
              <input
                type="text"
                {...register("no_mqa")}
                id="no_mqa"
                placeholder="MQA/"
                value={accreditations.no_mqa}
                className="input input-bordered w-1/2 mt-6"
              />
            </LabelWrapper>

            <DateUpdate
              name="program_start_date"
              label="Tarikh Mula Program"
              register={register}
              defValue={accreditations.program_start_date}
              className="mt-3"
              onChange={(e) => {
                const startDate = dayjs(e.target.value).toDate();
                setTarikhMulaProgram(startDate);
                setValue("program_start_date", e.target.value);
                setValue(
                  "program_end_date",
                  dayjs(startDate).add(5, "year").format("YYYY-MM-DD")
                );
              }}
            />
            {/* Hidden input for Tarikh Tamat Program */}
            <input type="hidden" {...register("program_end_date")} />
            {/* Tarikh Tamat Program */}
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="program_end_date" className="label-input-msa">
                Tarikh Tamat Program
              </label>
              <div className="w-full flex justify-start">
                <p className="ml-2">
                  {tarikhMulaProgram
                    ? dayjs(tarikhMulaProgram)
                        .add(5, "year")
                        .format("DD MMMM YYYY")
                    : "Masukkan Tarikh Mula Program"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex space-x-4 justify-end">
              <button
                type="button"
                className="btn btn-error shadow-md text-white"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Kembali
              </button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccreditationRecords_update;
