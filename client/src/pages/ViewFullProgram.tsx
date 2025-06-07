/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useThemeStore } from "../utils/useThemeStore";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import dayjs from "dayjs";

const ViewFullProgram = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const { id } = useParams();
  const themeStore = useThemeStore();

  interface Program {
    id: number;
    nama_program: string;
    tahapMQF: string;
    sektorAkademik: string;
    code_nec: string;
    mode_penawaran: string;
    fakulti: string;
    Sepenuh_max_Tahun: string;
    Sepenuh_max_Minggu: string;
    Sepenuh_max_Semester: string;
    Sepenuh_min_Tahun: string;
    Sepenuh_min_Minggu: string;
    Sepenuh_min_Semester: string;
    Sepenuh_SemesterPanjang_Semester: string;
    Sepenuh_SemesterPendek_Semester: string;
    Sepenuh_LatihanIndustri_Semester: string;
    Separuh_max_Tahun: string;
    Separuh_max_Minggu: string;
    Separuh_max_Semester: string;
    Separuh_min_Tahun: string;
    Separuh_min_Minggu: string;
    Separuh_min_Semester: string;
    Separuh_SemesterPanjang_Semester: string;
    Separuh_SemesterPendek_Semester: string;
    Separuh_LatihanIndustri_Semester: string;
    konvensional: string;
    odl: string;
    struktur_program: string;
    program_kerjasama: string;
    jenis_kerjasama: string;
    tarikhSurat: string;
    tarikhTerimaSurat: string;
    tarikhMesyuarat: string;
    tempohSah: string;
    sahSehingga: string;
    bilMesyuarat: string;
    minitJKPT: string;
    tarikMesyJKA: string;
    bilMesyuaratJKA: string;
    MinitJKA: string;
  }

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}`
      );
      console.table(response.data);
      setProgram(response.data[0]);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Program",
        text: "Berlaku ralat semasa mendapatkan program",
        footer: "Ralat :" + error.message,
        confirmButtonText: "Cuba Lagi",
      }).then((result) => {
        if (result.isConfirmed) {
          getProgram();
        }
      });
    }
  };

  useEffect(() => {
    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-5 font-sans space-y-6 ">
        <h1 className="text-3xl font-bold  mb-6">{program.nama_program}</h1>
        <div className="breadcrumbs text-md mb-2">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/program-list">Program List For MSA Application</a>
            </li>
            <li>View Program : {program.nama_program}</li>
          </ul>
        </div>

        <div className="flex  space-x-4  justify-end">
          <Link to={`/edit-program/${program.id}`}>
            <button className="btn btn-warning text-white">
              <FaEdit className="mr-2" /> Edit
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Program Details */}
          <div
            className={`card shadow-lg p-6 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg`}
          >
            <h2 className="text-2xl font-semibold mb-4">Program Details</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Tahap MQF:</td>
                  <td>{program.tahapMQF}</td>
                </tr>
                <tr>
                  <td className="font-medium">Sektor Academik:</td>
                  <td>{program.sektorAkademik}</td>
                </tr>
                <tr>
                  <td className="font-medium">Code NEC:</td>
                  <td>{program.code_nec}</td>
                </tr>
                <tr>
                  <td className="font-medium">Mod Penawaran:</td>
                  <td>{program.mode_penawaran}</td>
                </tr>
                <tr>
                  <td className="font-medium">Fakulti:</td>
                  <td>{program.fakulti}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Additional Details */}
          <div
            className={`card shadow-lg p-6 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg`}
          >
            <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Struktur Program :</td>
                  <td>{program.struktur_program}</td>
                </tr>
                <tr>
                  <td className="font-medium">Program Kerjasama:</td>
                  <td>{program.program_kerjasama}</td>
                </tr>
                <tr>
                  <td className="font-medium">Jenis Kerjasama:</td>
                  <td>{program.jenis_kerjasama}</td>
                </tr>
                <tr>
                  <td className="font-medium">Konvensional/Terbuka:</td>
                  <td>{program.konvensional == "true" ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="font-medium">Jarak Jauh (ODL):</td>
                  <td>{program.odl == "true" ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Full-time Study Details */}
          <div
            className={`card shadow-lg p-6 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg`}
          >
            {" "}
            <h2 className="text-2xl font-semibold mb-4">
              Pengajian Sepenuh Masa
            </h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Bilangan Tahun </td>

                  <td className="font-medium">
                    Minimum : {program.Sepenuh_min_Tahun} Tahun
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Sepenuh_max_Tahun} Tahun
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Bilangan Minggu </td>

                  <td className="font-medium">
                    Minimum : {program.Sepenuh_min_Minggu} Minggu
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Sepenuh_max_Minggu} Minggu
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Bilangan Semester </td>

                  <td className="font-medium">
                    Minimum : {program.Sepenuh_min_Semester} Semester
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Sepenuh_max_Semester} Semester
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Semester Panjang:</td>
                  <td>{program.Sepenuh_SemesterPanjang_Semester} Semester</td>
                </tr>
                <tr>
                  <td className="font-medium"> Semesters Pendek:</td>
                  <td>{program.Sepenuh_SemesterPendek_Semester} Semester</td>
                </tr>
                <tr>
                  <td className="font-medium">Latihan Industri:</td>
                  <td>{program.Sepenuh_LatihanIndustri_Semester} Semester</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Part-time Study Details */}
          <div
            className={`card shadow-lg p-6 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg`}
          >
            {" "}
            <h2 className="text-2xl font-semibold mb-4">
              Pengajian Separuh Masa
            </h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Bilangan Tahun </td>
                  <td className="font-medium">
                    Minimum : {program.Separuh_min_Tahun} Tahun
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Separuh_max_Tahun} Tahun
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Bilangan Minggu </td>
                  <td className="font-medium">
                    Minimum : {program.Separuh_min_Minggu} Minggu
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Separuh_max_Minggu} Minggu
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Bilangan Semester </td>

                  <td className="font-medium">
                    Minimum : {program.Separuh_min_Semester} Semester
                  </td>
                  <td className="font-medium">
                    <FaArrowRight />
                  </td>
                  <td className="font-medium">
                    Maximum : {program.Separuh_max_Semester} Semester
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Semester Panjang:</td>
                  <td>{program.Sepenuh_SemesterPanjang_Semester} Semester</td>
                </tr>
                <tr>
                  <td className="font-medium"> Semesters Pendek:</td>
                  <td>{program.Sepenuh_SemesterPendek_Semester} Semester</td>
                </tr>
                <tr>
                  <td className="font-medium">Latihan Industri:</td>
                  <td>{program.Sepenuh_LatihanIndustri_Semester} Semester</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Meeting Dates and Documents */}
          {/* Meeting Dates and Documents */}
          {/* JKPT Meeting Card */}
          <div
            className={`card shadow-lg p-6 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg mb-4`}
          >
            {" "}
            <h2 className="text-2xl font-semibold mb-4">JKPT Meeting</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Tarikh Surat MSA:</td>
                  <td>{dayjs(program.tarikhSurat).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td className="font-medium">Tarikh Terima Surat MSA:</td>
                  <td>
                    {dayjs(program.tarikhTerimaSurat).format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Tarikh Mesyuarat JKPT:</td>
                  <td>{dayjs(program.tarikhMesyuarat).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td className="font-medium">Tempoh Sah MSA:</td>
                  <td>{program.tempohSah}</td>
                </tr>
                <tr>
                  <td className="font-medium">Sah Sehingga:</td>
                  <td>{dayjs(program.sahSehingga).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td className="font-medium">Bil Mesyuarat JKPT:</td>
                  <td>Bil. {program.bilMesyuarat}</td>
                </tr>
                <tr>
                  <td className="font-medium">Minit JKPT:</td>
                  <td>
                    <a
                      href={`http://localhost:5000${program.minitJKPT}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {program.minitJKPT.split("/").pop()}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* JKA Meeting Card */}
          <div
            className={`card shadow-lg p-6 mb-4 ${
              themeStore.darkMode ? "bg-[#1f2937]" : "bg-white"
            } rounded-lg`}
          >
            {" "}
            <h2 className="text-2xl font-semibold mb-4">JKA Meeting</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Tarikh Mesyuarat JKA:</td>
                  <td>{dayjs(program.tarikMesyJKA).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td className="font-medium">Bil Mesyuarat JKA:</td>
                  <td>Bil. {program.bilMesyuaratJKA}</td>
                </tr>
                <tr>
                  <td className="font-medium">Minit JKA:</td>
                  <td>
                    <a
                      href={`http://localhost:5000${program.MinitJKA}`}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {program.MinitJKA.split("/").pop()}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ViewFullProgram;
