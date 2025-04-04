/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import {
  FaFileImage,
  FaHourglassEnd,
  FaHourglassStart,
  FaSalesforce,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import dayjs from "dayjs";

interface accreditation {
  accreditation_id: number;
  program_id: number;
  accreditationStartDate: Date;
  accreditationEndDate: Date;
  accreditationStatus: string;
  accreditationFilePath: string | null;
  application_type: string;
  no_mqa: string | null;
}

const AccreditationRecords_view = () => {
  const { VITE_DATABASE_HOST } = import.meta.env;
  const { id, nama_program } = useParams();
  const [accreditations, setAccreditations] = useState<accreditation | null>(
    null
  );
  const themeStore = useThemeStore();

  const getAccreditations = async () => {
    const response = await axios.get<accreditation[]>(
      `${VITE_DATABASE_HOST}/rekod-akreditasi/tambah-akreditasi/${id}/program`
    );
    setAccreditations(response.data[0]);
  };

  useEffect(() => {
    getAccreditations();
  }, []);
  if (!accreditations) {
    return <LoadingPage />; // Delay rendering until data is loaded
  }
  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col duration-300 h-screen">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Rekod Bayaran Program: <span className="font-bold">{nama_program}</span>
      </h1>

      {/* //!Breadcrumbs */}
      <div className="breadcrumbs text-md mb-6">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li>
          <li>Rekod Bayaran Program</li>
        </ul>
      </div>
      {/* //!Breadcrumbs */}

      <div
        className={`container  mb-32 mx-auto flex flex-col  ${
          themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 rounded-md shadow-md`}
      >
        {" "}
        <div>
          <h2 className="text-lg mb-4">
            Nama Program :{" "}
            <span className="text-large font-semibold">{nama_program}</span>
          </h2>
          <h2 className="text-lg mb-4">
            Jenis Akreditasi :{" "}
            <span className="text-large font-semibold">
              {accreditations.application_type}{" "}
            </span>
          </h2>
          <h2 className="text-lg mb-4">
            No MQA :{" "}
            <span className="text-large font-semibold">
              {accreditations.no_mqa}
            </span>
          </h2>
        </div>
        <div
          className={`card  ${
            themeStore.darkMode ? "bg-gray-700" : "bg-white"
          } shadow-md rounded-lg p-6`}
        >
          {" "}
          <h2 className="text-xl font-bold mb-12 text-center">
            Butiran Rekod Akreditasi
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaHourglassStart className="text-gray-500 mr-2" />
              <p className="text-lg">Tarikh Mula Akreditasi : </p>
              <p className="ml-2 font-medium text-lg">
                {dayjs(accreditations.accreditationStartDate).format(
                  "DD MMMM YYYY"
                )}
              </p>
            </div>
            <div className="flex items-center">
              <FaHourglassEnd className="text-gray-500 mr-2" />
              <p className="text-lg">Tarikh Tamat Akreditasi : </p>
              <p className="ml-2 font-medium text-lg">
                {dayjs(accreditations.accreditationEndDate).format(
                  "DD MMMM YYYY"
                )}{" "}
              </p>
            </div>
            <div className="flex items-center">
              <FaFileImage className="text-gray-500 mr-2" />
              <p className="text-lg">Sijil Akreditasi : </p>
              <p className="ml-2 font-medium text-lg">
                <a
                  href={`${VITE_DATABASE_HOST}${accreditations.accreditationFilePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {accreditations.accreditationFilePath
                    ? accreditations.accreditationFilePath.split("/")[3]
                    : "Tiada Sijil"}
                </a>
              </p>
            </div>
            <div className="flex items-center">
              <FaSalesforce className="text-gray-500 mr-2" />
              <p className="text-lg">Status Akreditasi (KENE TUKAR ICON): </p>
              <p className="ml-2 font-medium text-lg">
                <span
                  className={`badge badge-soft badge-lg ${
                    accreditations.accreditationStatus === "Active"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {accreditations.accreditationStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationRecords_view;
