import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";

interface Program {
  id: number;
  nama_program: string;
  fakulti: string;
}

const ProgramList: React.FC = () => {
  const [listProgram, setListProgram] = useState<Program[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const themeStore = useThemeStore();
  const { VITE_DATABASE_HOST } = import.meta.env;

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        `${VITE_DATABASE_HOST}/pendaftaran-program/maklumat-program`
      );
      setListProgram(response.data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  // const deleteProgram = async (id: number) => {
  //   try {
  //     await axios.delete(
  //       `${VITE_DATABASE_HOST}/pendaftaran-program/maklumat-program/${id}/delete`
  //     );

  //     const newProgramList = listProgram.filter((p) => p.id !== id);
  //     const newTotalPages = Math.ceil(
  //       newProgramList.filter(
  //         (p) =>
  //           p.nama_program.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           p.fakulti.toLowerCase().includes(searchQuery.toLowerCase())
  //       ).length / itemsPerPage
  //     );

  //     if (currentPage > newTotalPages) {
  //       setCurrentPage(newTotalPages);
  //     }

  //     setListProgram(newProgramList);
  //     Swal.fire({
  //       title: "Dihapus!",
  //       text: "Program berjaya dihapus.",
  //       icon: "success",
  //     });
  //   } catch (error: unknown) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //       footer: `Error: ${(error as Error).message}`,
  //     });
  //   }
  // };

  useEffect(() => {
    getProgram();
  }, []);

  // Search and pagination logic
  const filteredPrograms = listProgram.filter(
    (program) =>
      program.nama_program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.fakulti.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const currentPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`container mt-5 mx-auto  p-4`}>
      <h1 className="text-xl font-bold  mt-4 mb-4">
        PROGRAM LIST FOR MSA APPLICATION
      </h1>
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Program List For MSA Application</li>
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
      <div className="flex justify-between w-full p-4 mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Cari Nama Program atau Fakulti"
            className="input input-bordered w-full pl-12 pr-4 py-2 rounded-xl shadow-md focus:ring-2 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

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
                  // handleDelete(selectedIds);
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

          <button
            className={`btn btn-warning gap-2 ${
              selectedIds.length !== 1 && "hover:cursor-not-allowed"
            }`}
            disabled={selectedIds.length !== 1}
            onClick={() => {
              if (selectedIds.length === 1) {
                // window.location.href = `/akreditasi-program/${selectedIds[0]}/${program_name}/update-permohonan-akreditasi`;
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
          <Link to={`/MsaForm_onepage`}>
            <button className="btn bg-[#28a745] text-white rounded-lg hover:bg-[#218838] mr-4">
              <svg
                className="w-6 h-6 text-white"
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
              Tambah Program
            </button>
          </Link>
        </div>
        {/* )} */}
        {/* Action Buttons */}
      </div>

      <div className="h-[380px] rounded-lg shadow-md z-50">
        <table className="table table-zebra table-pin-rows w-full">
          <thead>
            <tr>
              <th className="text-lg sticky top-0 bg-base-200"> </th>
              <th className="text-lg sticky top-0 bg-base-200">Id</th>
              <th className="text-lg sticky top-0 bg-base-200">Program</th>
              <th className="text-lg sticky top-0 bg-base-200">Fakulti</th>
              {/* <th className="text-lg sticky top-0 bg-base-200">More</th> */}
              <th className="text-lg sticky top-0 bg-base-200">Pilih</th>
            </tr>
          </thead>
          <tbody>
            {currentPrograms.map((program) => (
              <tr key={program.id}>
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
                    }}
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td>{program.id}</td>
                <td className="hover:underline">
                  <a href={`/ProgramInfo/${program.id}`}>
                    {program.nama_program}
                  </a>
                </td>
                <td>{program.fakulti}</td>
                {/* <td>
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn btn-ghost  text-white  z-50"
                    >
                      <FaEllipsisV
                        className={`${
                          themeStore.darkMode ? "text-white" : "text-black"
                        } size-5.5 `}
                      />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
                    >
                      <li>
                        <Link
                          to={`/penilai-dalaman/${program.id}/${program.nama_program}`}
                        >
                          Senarai Penilai Dalaman
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/akreditasi-program/${program.id}/${program.nama_program}`}
                        >
                          Rekod Akreditasi Program
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/rekod-pembayaran/${program.id}/${program.nama_program}`}
                        >
                          Rekod Pembayaran Program
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td> */}
                <td>
                  <Link to={`/program/${program.id}/${program.nama_program}`}>
                    <button className="btn btn-primary btn-outline btn-md">
                      <svg
                        className={`w-6 h-6 ${
                          themeStore.darkMode && ""
                        } hover:cursor-pointer`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"
                        />
                      </svg>
                    </button>
                  </Link>
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

export default ProgramList;
