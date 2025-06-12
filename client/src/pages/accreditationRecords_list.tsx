/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface accreditation {
  accreditation_id: number;
  program_id: number;
  accreditationStartDate: Date;
  accreditationEndDate: Date;
  accreditationStatus: string;
  accreditationFilePath: string | null;
  application_type: string;
  no_mqa: string;
}

const Accreditation_list = () => {
  const { id, name } = useParams();
  const [accreditations, setAccreditations] = useState<accreditation[] | null>(
    []
  );
  const [selectedAccreditation, setSelectedAccreditations] = useState<number[]>(
    []
  );

  const getAccreditations = async () => {
    const records = await axios.get<accreditation[]>(
      `${VITE_DATABASE_HOST}/rekod-akreditasi/senarai-akreditasi-program/${id}`
    );
    setAccreditations(records.data);
  };

  const handleDelete = async (ids: number[]) => {
    try {
      await axios.delete(
        `${VITE_DATABASE_HOST}/rekod-akreditasi/senarai-akreditasi/delete`,
        { data: { ids } }
      );

      // Refresh the list after delete
      getAccreditations();
      setSelectedAccreditations([]);

      Swal.fire({
        title: "Dihapus!",
        text: "Rekod berjaya dihapus.",
        icon: "success",
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

  useEffect(() => {
    getAccreditations();
  });

  const { VITE_DATABASE_HOST } = import.meta.env;
  return (
    <div className={`container mt-5 mx-auto  p-4`}>
      <h1 className="text-xl font-bold  mt-4 mb-4">
        Rekod Akreditasi : <span className="font-bold">{name}</span>{" "}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {/* <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li> */}
          <li>Senarai Rekod Akreditasi : {name}</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <div className="flex  flex-col items-end">
        <div className="space-x-4 mb-2">
          <button
            className="btn btn-error"
            disabled={selectedAccreditation.length > 0 ? false : true}
            onClick={() =>
              Swal.fire({
                title: "Padam Penilai?",
                text: `Anda pasti untuk padam Penilai!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(selectedAccreditation);
                }
              })
            }
          >
            <FaTrashAlt className="text-white w-5 h-5" />
          </button>
          <Link
            to={`/akreditasi-program/${selectedAccreditation[0]}/kemaskini-akreditasi/${name}`}
          >
            <button
              className={`btn btn-warning text-white`}
              disabled={selectedAccreditation.length === 1 ? false : true}
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
              </svg>{" "}
            </button>
          </Link>

          <Link to={`/akreditasi-program/${id}/permohonan-akreditasi/${name}`}>
            <button className="btn bg-[#28a745] my-4 text-white">
              <svg
                className="w-6 h-6  text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Tambah Rekod Akreditasi
            </button>
          </Link>
        </div>
        <table className="table border  border-base-content/5 rounded-box w-full">
          <thead className="bg-base-300">
            <tr>
              <td></td>
              <td>Jenis Akreditasi</td>
              <td>Sijil Akreditasi</td>
              <td>No. MQA</td>
              <td>Status Akreditasi</td>
              <td>Tarikh Tamat Akreditasi</td>
              <td>Butiran Penuh Akreditasi</td>
            </tr>
          </thead>
          <tbody>
            {accreditations && accreditations.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-400 font-bold"
                >
                  Tiada Rekod Akreditasi Dijumpai
                </td>
              </tr>
            )}
            {accreditations &&
              accreditations.map((accreditation) => (
                <tr key={accreditation.accreditation_id}>
                  {/* <td>{accreditation.accreditation_id}</td> */}
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      id={accreditation.accreditation_id.toString()}
                      onChange={(e) => {
                        setSelectedAccreditations((prev) =>
                          e.target.checked
                            ? [...prev, accreditation.accreditation_id]
                            : prev.filter(
                                (id) => id !== accreditation.accreditation_id
                              )
                        );
                      }}
                    />
                  </td>
                  <td>
                    <label
                      className="hover:cursor-pointer"
                      htmlFor={accreditation.accreditation_id.toString()}
                    >
                      {accreditation.application_type}
                    </label>
                  </td>
                  <td>
                    <a
                      href={`${VITE_DATABASE_HOST}${accreditation.accreditationFilePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {accreditation.accreditationFilePath
                        ? accreditation.accreditationFilePath.split("/").pop()
                        : null}
                    </a>
                  </td>
                  <td>
                    {accreditation.no_mqa ? (
                      <p>{accreditation.no_mqa}</p>
                    ) : (
                      <p className="text-error">Tiada No. MQA</p>
                    )}
                  </td>
                  <td>
                    <div
                      className={`badge badge-md badge-soft px-6 badge-${
                        accreditation.accreditationStatus === "Active"
                          ? "success"
                          : "error"
                      }`}
                    >
                      {accreditation.accreditationStatus === "Active"
                        ? "Aktif"
                        : "Tidak Aktif"}
                    </div>
                  </td>
                  <td>
                    {dayjs(accreditation.accreditationEndDate).format(
                      "DD MMMM YYYY"
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/akreditasi-program/${accreditation.accreditation_id}/${name}/butiran-penuh-akreditasi`}
                    >
                      <button className="btn btn-primary btn-outline btn-sm">
                        <FaRegEye className="w-5 h-5  mr-1" />{" "}
                        <p className="">Lihat</p>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accreditation_list;
