/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useThemeStore } from "../utils/useThemeStore";
import {
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaUser,
  FaCalendarAlt,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";

interface Evaluator {
  id: number;
  name: string;
  evaluator_name: string;
  evaluator_email: string;
  evaluator_phone: string;
  evaluator_faculty: string;
  evaluator_position: string;
  evaluator_status: string;
  evaluator_field: string;
  evaluator_appointment_date: Date;
  evaluator_end_date: Date;
  evaluator_appointment_period: number;
  program_id: number;
}

const InternalEvaluator_view = () => {
  const { name, id, id_program } = useParams();
  const [evaluator, setEvaluator] = useState<Evaluator | null>(null);
  const themeStore = useThemeStore();

  const getEvaluator = async () => {
    try {
      const response = await axios.get<Evaluator[]>(
        `http://localhost:5000/penilai-dalaman/penilai/${id}`
      );
      setEvaluator(response.data[0]);
      console.table(evaluator);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Program",
        text: "Berlaku ralat semasa mendapatkan program",
        footer: "Ralat :" + error.message,
        confirmButtonText: "Cuba Lagi",
      }).then((result: any) => {
        if (result.isConfirmed) {
          getEvaluator();
        }
      });
    }
  };

  useEffect(() => {
    getEvaluator();
  }, []);

  const renderEvaluatorInfo = () => {
    if (!evaluator) return null;
    return (
      <div
        className={`card  ${
          themeStore.darkMode ? "bg-gray-700" : "bg-white"
        } shadow-md rounded-lg container`}
      >
        <h2 className="text-2xl mt-2 font-bold container text-center">
          Maklumat Penilai
        </h2>
        <div className="space-y-4 p-4">
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <p className="text-lg">
              Nama Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_name}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <p className="text-lg">
              Email Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_email}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-gray-500 mr-2" />
            <p className="text-lg">
              No. Telefon Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_phone}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaUniversity className="text-gray-500 mr-2" />
            <p className="text-lg">
              Fakulti Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_faculty}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="text-gray-500 mr-2" />
            <p className="text-lg">
              Kedudukan Penilai:{" "}
              <span className="font-medium">
                {evaluator.evaluator_position}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            {evaluator.evaluator_status === "Aktif" ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaTimesCircle className="text-red-500 mr-2" />
            )}
            <p className="text-lg">
              Status Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_status}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-2" />
            <p className="text-lg">
              Bidang Penilai:{" "}
              <span className="font-medium">{evaluator.evaluator_field}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <p className="text-lg mr-2">
              Dilantik pada :{" "}
              <span className="font-medium">
                {new Date(
                  evaluator.evaluator_appointment_date
                ).toLocaleDateString()}
              </span>
            </p>
            <IoMdArrowForward />

            <p className="text-lg ml-2">
              {" "}
              Sehingga :{" "}
              <span className="font-medium">
                {new Date(evaluator.evaluator_end_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col duration-300">
      <h1 className="text-2xl font-medium mt-4 mb-4 ">
        Maklumat Penilai :{" "}
        <span className="font-bold">{evaluator?.evaluator_name}</span>
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
            <a href={`/penilai-dalaman/${id_program}/${name}`}>
              Senarai Penilai Dalaman
            </a>
          </li>
          <li>Maklumat Penilai</li>
        </ul>
      </div>
      <div
        className={`container mt-10 mb-32 mx-auto flex flex-col ${
          themeStore.darkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 rounded-md shadow-md`}
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-lg mb-4">
            Penilai Program :{" "}
            <span className="text-large font-semibold">{name}</span>
          </h2>
          <Link to={`/daftar-penilai/${id_program}/${id}/${name}/update`}>
            <button className="btn btn-warning gap-2 mb-4">
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
          </Link>
        </div>
        {renderEvaluatorInfo()}
      </div>
    </div>
  );
};

export default InternalEvaluator_view;
