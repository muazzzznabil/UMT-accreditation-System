import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEye, FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
// import { set } from "react-hook-form";
// import { set } from "react-hook-form";

interface application {
  id: number;
  program_id: number;
  program_name: string;
  application_status: string;
  application_type: string;
  application_path: string;
  application_submission_date: string;
  feedback_id: number;
  hasFeedback?: boolean;
}

const Application_view: React.FC = () => {
  const [listApplication, setListApplication] = useState<application[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [program_name, setProgram_name] = useState<string>("");
  const [notPending, setNotPending] = useState<{ [key: number]: string }>({});

  // ** GET APPLICATION **
  const getApplication = async () => {
    try {
      // Fetch applications
      const response = await axios.get<application[]>(
        "http://localhost:5000/rekod-akreditasi/senarai-permohonan-akreditasi"
      );
      setListApplication(response.data);

      // Initialize the notPending state for all programs
      const initialNotPending: { [key: number]: string } = {};
      response.data.forEach((program) => {
        initialNotPending[program.id] = program.application_status;
      });
      setNotPending(initialNotPending);

      // Fetch feedback data
      const feedbackResponse = await axios.get<{ application_id: number }[]>(
        "http://localhost:5000/mqa-feedback/semak-maklumbalas"
      );

      // Map feedback application IDs to a set for quick lookup
      const feedbackSet = new Set(
        feedbackResponse.data.map((feedback) => feedback.application_id)
      );

      // Add a flag to each program to indicate whether feedback exists
      setListApplication((prev) =>
        prev.map((program) => ({
          ...program,
          hasFeedback: feedbackSet.has(program.id), // Check if feedback exists for the application
        }))
      );
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  const handleDelete = async (ids: number[]) => {
    try {
      await axios.delete(
        `http://localhost:5000/rekod-akreditasi/permohonan-akreditasi/delete-multiple`,
        { data: { ids } }
      );

      setListApplication((prev) =>
        prev.filter((evalItem) => !ids.includes(evalItem.id))
      );
      setSelectedIds([]);

      Swal.fire({
        title: "Dihapus!",
        text: "Program berjaya dihapus.",
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
    const fetchData = async () => {
      await getApplication();
    };
    fetchData();
  }, []);

  // Search and pagination logic
  const filteredPrograms = listApplication.filter(
    (application) =>
      application.program_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.application_status
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      application.application_type
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const currentPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto mt-5 font-sans ">
      <h1 className="text-xl font-bold  mt-4 mb-4">
        Senarai Permohonan Akreditasi Program
      </h1>
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li> Senarai Permohonan Akreditasi Program</li>
        </ul>
      </div>

      {error && (
        <div role="alert" className="alert alert-error fixed bottom-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error fetching programs!</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-between w-full mb-2 mt-12">
        <div className="relative w-full max-w-sm">
          <label className="input">
            {/* <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg> */}
            <FaSearch className="opacity-60" />
            <input
              type="text"
              placeholder="Cari Nama Program, Jenis Permohonan Atau Status Permohonan"
              // className="input input-bordered w-full pl-12 pr-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
        </div>
        <div className="flex">
          {/* Action Buttons */}
          {/* {selectedIds.length > 0 && ( */}
          <div className="flex gap-4 mr-4 mb-4 justify-end">
            <button
              className="btn btn-error gap-2"
              disabled={selectedIds.length === 0}
              onClick={() =>
                Swal.fire({
                  title: "Padam Permohonan?",
                  text: `Anda pasti untuk padam Rekod Permohonan!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Hapus",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(selectedIds);
                  }
                })
              }
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            {/* {selectedIds.length === 1 && ( */}

            <button
              className={`btn btn-warning gap-2 ${
                selectedIds.length !== 1 && "hover:cursor-not-allowed"
              }`}
              disabled={selectedIds.length !== 1}
              onClick={() => {
                if (selectedIds.length === 1) {
                  window.location.href = `/akreditasi-program/${selectedIds[0]}/${program_name}/update-permohonan-akreditasi`;
                }
              }}
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
            </button>
          </div>
          {/* )} */}
          {/* Action Buttons */}
          <Link to={`/akreditasi-program/permohonan-akreditasi/`}>
            <button className="btn bg-[#28a745] text-white rounded-lg hover:bg-[#218838] mr-4">
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
              Tambah Permohonan
            </button>
          </Link>
        </div>
      </div>

      <div className="h-[464px] rounded-lg shadow-md z-50">
        <table className="table table-zebra table-pin-rows w-full">
          <thead>
            <tr>
              <th className="text-lg sticky top-0 bg-base-200"></th>
              {/* <th className="text-lg sticky top-0 bg-base-200">Id</th> */}
              <th className="text-lg sticky top-0 bg-base-200">Nama Program</th>
              <th className="text-lg sticky top-0 bg-base-200">Status</th>
              <th className="text-lg sticky top-0 bg-base-200">
                Jenis Permohonan
              </th>
              <th className="text-lg sticky top-0 bg-base-200">
                Tarikh Permohonan
              </th>
              <th className="text-lg sticky top-0 bg-base-200">
                View Documents
              </th>
              <th className="text-lg sticky top-0 bg-base-200">
                Maklumbalas MQA
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPrograms.map((program) => (
              <tr
                key={program.id}
                onLoad={() => setNotPending(program.application_status)}
              >
                <td>
                  <input
                    type="checkbox"
                    id={program.id.toString()}
                    checked={selectedIds.includes(program.id)}
                    onChange={(e) => {
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, program.id]
                          : prev.filter((id) => id !== program.id)
                      );
                      setProgram_name(program.program_name);
                    }}
                    className="checkbox checkbox-primary"
                  />
                </td>
                {/* <td>{program.id}</td> */}
                <td>
                  <label
                    htmlFor={program.id.toString()}
                    className="hover:cursor-pointer"
                  >
                    {program.program_name}
                  </label>
                </td>
                <td>
                  <div
                    className={`badge  py-4 badge-soft  ${
                      program.application_status === "rejected"
                        ? "badge-error"
                        : program.application_status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }  `}
                  >
                    {program.application_status}
                  </div>
                </td>
                <td>{program.application_type}</td>
                <td>
                  <p className="text-md">
                    {dayjs(program.application_submission_date).format(
                      "DD MMM YYYY"
                    )}
                  </p>
                </td>
                <td>
                  <a
                    className="btn btn-info btn-outline"
                    target="_blank"
                    href={`http://localhost:5000${program.application_path}`}
                    rel="noopener noreferrer"
                  >
                    <FaEye />
                    View
                  </a>
                </td>
                <td>
                  <div className="indicator">
                    {notPending[program.id] !== "pending" &&
                      !program.hasFeedback && (
                        <>
                          <span className="indicator-item status status-error animate-ping mr-2 mt-2"></span>
                          <span className="indicator-item status status-error mr-2 mt-2"></span>
                        </>
                      )}
                    <ul className="menu lg:menu-horizontal rounded-box">
                      <li className="">
                        <details>
                          <summary
                            className={`btn btn-soft ${
                              notPending[program.id] === "pending"
                                ? "btn-disabled"
                                : "btn-primary"
                            }`}
                            aria-disabled={notPending[program.id] === "pending"}
                          >
                            Maklumbalas
                          </summary>
                          <ul className="z-50">
                            {!program.hasFeedback && (
                              <Link
                                to={`/maklumbalas-akreditasi/${program.id}/${program.program_id}`}
                              >
                                <li>
                                  <a>Tambah Maklumbalas</a>
                                </li>
                              </Link>
                            )}

                            {program.hasFeedback && (
                              <li>
                                <Link
                                  to={`/maklumbalas-akreditasi/${program.id}/${program.program_id}/maklumat-maklumbalas `}
                                >
                                  <a>Lihat Maklumbalas</a>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join mt-4 flex justify-center">
        <button
          className="join-item btn btn-disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
        </button>
        <button
          className="join-item btn btn-disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Application_view;
