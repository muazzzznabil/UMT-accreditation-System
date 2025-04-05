/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import { SubmitHandler, useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import LabelWrapper from "../components/LabelWrapper";

interface application {
  id: number;
  program_id: number;
  program_name: string;
  application_status: string;
  application_type: string;
  application_path: string;
  application_submission_date: Date;
}

const Accreditation_register = () => {
  const { id, nama_program } = useParams();
  const { darkMode } = useThemeStore();
  const [applicationList, setApplicationList] = useState<
    application[] | null
  >();
  const [tarikhMula, setTarikhMula] = useState<Date | null>(null);

  const {
    register,
    // formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({});

  const getApplicationList = async () => {
    try {
      const response = await axios.get<application[]>(
        `http://localhost:5000/rekod-akreditasi/senarai-akreditasi/${id}`
      );
      setApplicationList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching accreditation application:", error);
    }
  };

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
      .post(
        `http://localhost:5000/rekod-akreditasi/tambah-akreditasi`,
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
            window.location.href = `/akreditasi-program/${
              applicationList![0].program_id
            }/${nama_program}`;
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

  // ! TESTING
  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };

  useEffect(() => {
    getApplicationList();
  }, []);

  useEffect(() => {
    if (tarikhMula) {
      setValue(
        "accreditationEndDate",
        dayjs(tarikhMula).add(5, "year").format("YYYY-MM-DD")
      );
    }
  }, [tarikhMula, setValue]);

  return (
    <div className={`container mt-5 mx-auto  p-4`}>
      <h1 className="text-xl font-bold  mt-4 mb-4">
        Rekod Permohonan Akreditasi :{" "}
        <span className="font-bold">{nama_program}</span>{" "}
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
            <a
              href={`/akreditasi-program/${applicationList?.[0].program_id}/${nama_program}`}
            >
              Rekod Akreditasi Program: {nama_program}
            </a>
          </li>
          <li>Rekod Permohonan Akreditasi</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden Input */}
        <input
          type="hidden"
          {...register("accreditationStatus")}
          value={"Active"}
        />
        <input type="hidden" {...register("program_id")} value={id} />
        <input type="hidden" {...register("accreditationEndDate")} />

        {/* Hidden Input */}

        <div
          className={`container mt-10 mb-32 mx-auto flex flex-col ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-md shadow-md`}
        >
          {/* Jenis Akreditasi */}
          <div className={`flex  items-center w-full`}>
            <label htmlFor="accreditationType" className="label-input-msa">
              Pilih Permohonan
            </label>
            <div className="w-full">
              <select
                id="accreditationType"
                className={`select  select-bordered w-full `}
                required
                {...register("application_id", { required: true })}
              >
                <option
                  value=""
                  disabled
                  hidden
                  selected
                  className="text-gray-400"
                >
                  Pilih Permohonan yang sudah diluluskan
                </option>
                {applicationList?.map((application) => (
                  <option key={application.id} value={application.id}>
                    {application.application_type} -{" "}
                    {dayjs(application.application_submission_date).format(
                      "DD MMMM YYYY"
                    )}
                  </option>
                ))}
                {applicationList === null && (
                  <option>Sila isi borang permohonan dahulu</option>
                )}
              </select>
            </div>
          </div>

          {/* Jenis Akreditasi */}

          <DateUpdate
            name="accreditationStartDate"
            label="Tarikh Mula Akreditasi"
            register={register}
            defValue={null}
            className="mt-3 validator"
            onChange={(e) => setTarikhMula(dayjs(e.target.value).toDate())}
          />

          {/* Tarikh Tamat Akreditasi */}
          <div className="flex justify-between items-center">
            <label htmlFor="accreditationEndDate" className="label-input-msa">
              Tarikh Tamat Akreditasi
            </label>
            <div className="w-full flex justify-start">
              <p className="ml-2">
                {tarikhMula
                  ? dayjs(tarikhMula).add(5, "year").format("DD MMMM YYYY")
                  : "Masukkan Tarikh Mula Akreditasi"}
              </p>
            </div>
          </div>
          {/* Tarikh Tamat Akreditasi */}

          <div className="flex justify-between items-center my-4">
            <label htmlFor="accreditationStatus" className="label-input-msa">
              Sijil Akreditasi
            </label>
            <div className="w-full flex justify-start">
              <input
                type="file"
                className=" file-input w-1/2"
                {...register("accreditationFilePath")}
              />
            </div>
          </div>

          <LabelWrapper label="No. MQA" labelId="no_mqa">
            <input
              type="text"
              {...register("no_mqa")}
              id="no_mqa"
              placeholder="MQA/"
              defaultValue={"MQA/"}
              className="input input-bordered w-1/2"
            />
          </LabelWrapper>

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
      </form>
    </div>
  );
};

export default Accreditation_register;
