import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        "http://localhost:5000/pendaftaran-program/maklumat-program"
      );
      setListProgram(response.data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(error.message);
    }
  };

  const deleteProgram = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/delete`
      );

      const newProgramList = listProgram.filter((p) => p.id !== id);
      const newTotalPages = Math.ceil(
        newProgramList.filter(
          (p) =>
            p.nama_program.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.fakulti.toLowerCase().includes(searchQuery.toLowerCase())
        ).length / itemsPerPage
      );

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }

      setListProgram(newProgramList);
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
    <div className="container mx-auto mt-5 font-sans h-screen">
      <h1 className="text-xl font-bold p-2 mt-4 mb-4">
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
        <Link to={`/MsaForm_onepage`}>
          <button className="btn bg-[#28a745] text-white rounded-lg hover:bg-[#218838] mr-4">
            <svg
              className="w-6 h-6 text-gray-800 text-white"
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

      {/* Table Container with Fixed Height */}
      <div className="h-[510px] rounded-lg shadow-md z-50">
        <table className="table table-zebra table-pin-rows w-full">
          <thead>
            <tr>
              <th className="text-lg sticky top-0 bg-base-200">Id</th>
              <th className="text-lg sticky top-0 bg-base-200">Program</th>
              <th className="text-lg sticky top-0 bg-base-200">Fakulti</th>
              <th className="text-lg sticky top-0 bg-base-200">View</th>
              <th className="text-lg sticky top-0 bg-base-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPrograms.map((program) => (
              <tr key={program.id}>
                <td>{program.id}</td>
                <td className="hover:underline">
                  <a href={`/ProgramInfo/${program.id}`}>
                    {program.nama_program}
                  </a>
                </td>
                <td>{program.fakulti}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn btn-primary text-white m-2 z-50"
                    >
                      Go to
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
                        <Link to="/#">Rekod Pembayaran</Link>
                      </li>
                      <li>
                        <Link to="/#">Sijil Akreditasi</Link>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/edit-program/${program.id}`)
                    }
                    className="mr-2 btn btn-warning text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: "Padam Program?",
                        text: `Anda pasti untuk padam program ${program.nama_program}!`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Hapus",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProgram(program.id);
                        }
                      })
                    }
                    className="btn btn-error text-white"
                  >
                    Delete
                  </button>
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
