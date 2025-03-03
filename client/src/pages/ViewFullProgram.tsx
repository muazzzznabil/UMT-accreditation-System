import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewFullProgram = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const { id } = useParams();

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
    } catch (error) {
      console.error(error);
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
      <div className="container mx-auto mt-5 font-sans space-y-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Program Details */}
          <div className="card shadow-lg p-6 bg-white rounded-lg">
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
          <div className="card shadow-lg p-6 bg-white rounded-lg">
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
                  <td className="font-medium">Konvensional:</td>
                  <td>{program.konvensional == "true" ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="font-medium">ODL:</td>
                  <td>{program.odl == "true" ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Full-time Study Details */}
          <div className="card shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Full-time Study Details
            </h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Max Years:</td>
                  <td>{program.Sepenuh_max_Tahun}</td>
                </tr>
                <tr>
                  <td className="font-medium">Max Weeks:</td>
                  <td>{program.Sepenuh_max_Minggu}</td>
                </tr>
                <tr>
                  <td className="font-medium">Max Semesters:</td>
                  <td>{program.Sepenuh_max_Semester}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Years:</td>
                  <td>{program.Sepenuh_min_Tahun}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Weeks:</td>
                  <td>{program.Sepenuh_min_Minggu}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Semesters:</td>
                  <td>{program.Sepenuh_min_Semester}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Part-time Study Details */}
          <div className="card shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Part-time Study Details
            </h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Max Years:</td>
                  <td>{program.Separuh_max_Tahun}</td>
                </tr>
                <tr>
                  <td className="font-medium">Max Weeks:</td>
                  <td>{program.Separuh_max_Minggu}</td>
                </tr>
                <tr>
                  <td className="font-medium">Max Semesters:</td>
                  <td>{program.Separuh_max_Semester}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Years:</td>
                  <td>{program.Separuh_min_Tahun}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Weeks:</td>
                  <td>{program.Separuh_min_Minggu}</td>
                </tr>
                <tr>
                  <td className="font-medium">Min Semesters:</td>
                  <td>{program.Separuh_min_Semester}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Meeting Dates and Documents */}
          {/* Meeting Dates and Documents */}
          {/* JKPT Meeting Card */}
          <div className="card shadow-lg p-6 bg-white rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">JKPT Meeting</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Tarikh Surat MSA:</td>
                  <td>
                    {new Date(program.tarikhSurat)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join("-")}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Tarikh Terima Surat MSA:</td>
                  <td>
                    {new Date(program.tarikhTerimaSurat)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join("-")}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Tarikh Mesyuarat JKPT:</td>
                  <td>{program.tarikhMesyuarat}</td>
                </tr>
                <tr>
                  <td className="font-medium">Tempoh Sah MSA:</td>
                  <td>{program.tempohSah}</td>
                </tr>
                <tr>
                  <td className="font-medium">Sah Sehingga:</td>
                  <td>{program.sahSehingga}</td>
                </tr>
                <tr>
                  <td className="font-medium">Bil Mesyuarat JKPT:</td>
                  <td>{program.bilMesyuarat}</td>
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
          <div className="card shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">JKA Meeting</h2>
            <table className="table table-auto w-full">
              <tbody>
                <tr>
                  <td className="font-medium">Tarikh Mesyuarat JKA:</td>
                  <td>
                    {new Date(program.tarikMesyJKA)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .split("/")
                      .join("-")}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Bil Mesyuarat JKA:</td>
                  <td>{program.bilMesyuaratJKA}</td>
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
    </>
  );
};

export default ViewFullProgram;
