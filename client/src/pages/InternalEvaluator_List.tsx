/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useThemeStore } from "../utils/useThemeStore";
// import { usePageState } from "../utils/usePageState";
// Removed react-select import
import withReactContent from "sweetalert2-react-content";
// import { FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

interface Evaluator {
  id: number;
  evaluator_id: number;
  name: string;
  evaluator_name: string;
  evaluator_email: string;
  evaluator_phone: string;
  evaluator_faculty: string;
  evaluator_position: string;
  evaluator_field: string;
  evaluator_status: string;
  evaluator_appointment_date: Date;
  evaluator_end_date: Date;
  evaluator_appointment_period: number;
  evaluator_specific_field: string | null;
}

const Evaluator_List = () => {
  const { id, name } = useParams();
  const [listEvaluator, setListEvaluator] = useState<Evaluator[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { darkMode } = useThemeStore();
  const [allEvaluators, setAllEvaluators] = useState<Evaluator[]>([]);
  const [selectedEvaluatorInModal, setSelectedEvaluatorInModal] = useState<
    number | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPositionModalOpen, setEditPositionModalOpen] = useState(false);
  const [editPositionEvaluator, setEditPositionEvaluator] =
    useState<Evaluator | null>(null);
  const [editSelectedPosition, setEditSelectedPosition] = useState<string>("");
  const { VITE_DATABASE_HOST } = import.meta.env;
  const MySwal = withReactContent(Swal);

  const fetchProgramEvaluators = async () => {
    // Renamed for clarity
    try {
      const response = await axios.get<Evaluator[]>(
        `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/${id}/program`
      );
      setListEvaluator(response.data);
    } catch (error) {
      console.error("Error fetching program evaluators:", error);
    }
  };

  const fetchAllEvaluators = async () => {
    // Renamed for clarity
    try {
      const response = await axios.get<Evaluator[]>(
        `${VITE_DATABASE_HOST}/penilai-dalaman/semua-penilai`
      );
      setAllEvaluators(response.data);
    } catch (error) {
      console.error("Failed to fetch all evaluators:", error);
      MySwal.fire("Error", "Gagal mengambil senarai semua penilai.", "error");
    }
  };
  const handleAddExistingEvaluator = async (position?: string | null) => {
    if (!selectedEvaluatorInModal) {
      MySwal.fire("Perhatian", "Sila pilih seorang penilai.", "warning");
      return;
    }
    if (!id) {
      MySwal.fire("Ralat", "ID Program tidak ditemui.", "error");
      return;
    }
    if (!position) {
      MySwal.fire("Perhatian", "Sila pilih posisi penilai.", "warning");
      return;
    }

    try {
      await axios.put(
        `${VITE_DATABASE_HOST}/penilai-dalaman/tambah-program-penilai`,
        {
          evaluator_id: selectedEvaluatorInModal,
          program_id: id,
          evaluator_position: position,
        }
      );
      MySwal.fire(
        "Berjaya!",
        "Penilai berjaya ditambah ke program ini.",
        "success"
      );
      fetchProgramEvaluators(); // Refresh the list
      setModalOpen(false);
      setSelectedEvaluatorInModal(null);
    } catch (error: any) {
      console.error("Error adding existing evaluator to program:", error);
      const errorMessage =
        error.response?.data?.message ===
        "Penilai sudah didaftarkan untuk program ini."
          ? "Penilai sudah didaftarkan untuk program ini."
          : error.response?.data?.message ||
            "Gagal menambah penilai ke program.";
      MySwal.fire("Ralat", errorMessage, "error");
    }
  };

  const handleEditPosition = (evaluator: Evaluator) => {
    setEditPositionEvaluator(evaluator);
    setEditSelectedPosition(evaluator.evaluator_position || "");
    setEditPositionModalOpen(true);
  };

  const handleUpdatePosition = async () => {
    if (!editPositionEvaluator || !editSelectedPosition) return;
    // If changing to Ketua, check if another Ketua exists
    if (editSelectedPosition === "Ketua Panel Penilai") {
      const currentKetua = listEvaluator.find(
        (e) =>
          e.evaluator_position === "Ketua Panel Penilai" &&
          e.evaluator_id !== editPositionEvaluator.evaluator_id
      );
      if (currentKetua) {
        // Downgrade current Ketua to Ahli
        try {
          await axios.put(
            `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/${currentKetua.evaluator_id}/edit-position`,
            {
              evaluator_position: "Ahli Panel Penilai",
            }
          );
        } catch (error) {
          console.error("Failed to downgrade current Ketua:", error);
          MySwal.fire(
            "Ralat",
            "Gagal menukar posisi Ketua sedia ada.",
            "error"
          );
          return;
        }
      }
    }
    // Update selected evaluator's position
    try {
      await axios.put(
        `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/${editPositionEvaluator.evaluator_id}/edit-position`,
        {
          evaluator_position: editSelectedPosition,
        }
      );
      MySwal.fire("Berjaya!", "Posisi penilai berjaya dikemaskini.", "success");
      setEditPositionModalOpen(false);
      setEditPositionEvaluator(null);
      setEditSelectedPosition("");
      fetchProgramEvaluators();
    } catch (error) {
      console.error("Failed to update evaluator position:", error);
      MySwal.fire("Ralat", "Gagal mengemaskini posisi penilai.", "error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProgramEvaluators();
    }
    fetchAllEvaluators();
  }, [id]);

  // Modal component with basic searchable list
  const AddEvaluatorModal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPosition, setSelectedPosition] = useState<string | null>(
      null
    );

    const ketuaExists = listEvaluator.some(
      (e) => e.evaluator_position === "Ketua Panel Penilai"
    );

    const filteredEvaluators = allEvaluators.filter((evaluator) =>
      evaluator.evaluator_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!modalOpen) return null;

    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 backdrop-blur-sm"
        onClick={() => {
          setModalOpen(false);
          setSelectedEvaluatorInModal(null);
          setSearchTerm("");
          setSelectedPosition(null);
        }}
      >
        <div
          className={`relative w-full max-w-md mx-auto rounded-lg shadow-lg p-6 ${
            darkMode ? "bg-base-200 text-gray-300" : "bg-white text-gray-900"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg">Tambah Penilai Sedia Ada</h3>

          <div className="flex items-center gap-2  ">
            <input
              type="text"
              placeholder="Cari nama penilai..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`input input-bordered w-full mb-3 ${
                darkMode
                  ? "bg-base-300 border-gray-600 text-gray-300 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
            <div
              className="tooltip hover:tooltip-open tooltip-right"
              data-tip="Tambah Penilai Baru"
            >
              <button
                onClick={() => {
                  window.location.href =
                    "/senarai-penilai-dalaman/daftar-penilai";
                }}
              >
                <FiPlusCircle className="size-10 text-green-400 hover:text-green-600 hover:cursor-pointer mb-1" />
              </button>
            </div>
          </div>

          <div
            className={`border rounded-lg max-h-60 overflow-y-auto ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            {filteredEvaluators.length > 0 ? (
              filteredEvaluators.map((evaluator) => (
                <div
                  key={evaluator.evaluator_id}
                  className={`p-3 cursor-pointer 
                            ${
                              selectedEvaluatorInModal === evaluator.id
                                ? darkMode
                                  ? "bg-primary text-primary-content"
                                  : "bg-primary text-white"
                                : darkMode
                                ? "hover:bg-base-300/50"
                                : "hover:bg-gray-100"
                            }
                            ${
                              darkMode &&
                              selectedEvaluatorInModal !== evaluator.id
                                ? "text-gray-300"
                                : ""
                            }
                            ${
                              !darkMode &&
                              selectedEvaluatorInModal !== evaluator.id
                                ? "text-gray-900"
                                : ""
                            }`}
                  onClick={() => {
                    setSelectedEvaluatorInModal(evaluator.id);
                  }}
                >
                  {evaluator.evaluator_name}
                  {selectedEvaluatorInModal === evaluator.id && (
                    <span className="ml-2">✓</span>
                  )}
                </div>
              ))
            ) : (
              <p
                className={`p-3 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {searchTerm
                  ? "Tiada penilai ditemui."
                  : "Sila taip untuk mencari."}
              </p>
            )}
          </div>
          <p className="py-2">Pilih posisi penilai:</p>
          <select
            className="select select-bordered w-full mb-3"
            value={selectedPosition || ""}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="" disabled hidden selected>
              Pilih Posisi Penilai
            </option>
            <option value="Ketua Panel Penilai" disabled={ketuaExists}>
              Ketua Panel Penilai {ketuaExists ? "(Sudah Ada)" : ""}
            </option>
            <option value="Ahli Panel Penilai">Ahli Panel Penilai</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleAddExistingEvaluator(selectedPosition);
                setModalOpen(false);
                setSearchTerm("");
                setSelectedPosition(null);
              }}
              disabled={!selectedEvaluatorInModal || !selectedPosition}
            >
              Tambah
            </button>
            <button
              className="btn"
              onClick={() => {
                setModalOpen(false);
                setSelectedEvaluatorInModal(null);
                setSearchTerm("");
                setSelectedPosition(null);
              }}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditPositionModal = () => {
    if (!editPositionModalOpen || !editPositionEvaluator) return null;
    const ketuaExists = listEvaluator.some(
      (e) =>
        e.evaluator_position === "Ketua Panel Penilai" &&
        e.evaluator_id !== editPositionEvaluator.evaluator_id
    );
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-sm"
        onClick={() => setEditPositionModalOpen(false)}
      >
        <div
          className={`relative w-full max-w-md mx-auto rounded-lg shadow-lg p-6 ${
            darkMode ? "bg-base-200 text-gray-300" : "bg-white text-gray-900"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg mb-2">Kemaskini Posisi Penilai</h3>
          <div className="mb-4">{editPositionEvaluator.evaluator_name}</div>
          <select
            className="select select-bordered w-full mb-3"
            value={editSelectedPosition}
            onChange={(e) => setEditSelectedPosition(e.target.value)}
          >
            <option value="" disabled>
              Pilih Posisi Penilai
            </option>
            <option value="Ketua Panel Penilai" disabled={ketuaExists}>
              Ketua Panel Penilai {ketuaExists ? "(Sudah Ada)" : ""}
            </option>
            <option value="Ahli Panel Penilai">Ahli Panel Penilai</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-primary"
              onClick={handleUpdatePosition}
              disabled={!editSelectedPosition}
            >
              Simpan
            </button>
            <button
              className="btn"
              onClick={() => setEditPositionModalOpen(false)}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleDelete = async (ids: number[]) => {
    // ... (handleDelete implementation)
    try {
      await axios.delete(
        `${VITE_DATABASE_HOST}/penilai-dalaman/penilai/delete-multiple/evaluator-program`,
        { data: { ids } }
      );

      setListEvaluator((prev) =>
        prev.filter((evalItem) => !ids.includes(evalItem.evaluator_id))
      );
      setSelectedIds([]);

      Swal.fire({
        title: "Dihapus!",
        text: "Penilai berjaya dihapus.",
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

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col duration-300 ">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Penilai Dalaman Program: <span className="font-bold">{name}</span>
      </h1>

      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {/* <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li> */}
          <li>Senarai Penilai Dalaman</li>
        </ul>
      </div>

      <div className="flex flex-col items-center">
        <table className="table table-pin-rows table-auto w-full">
          <thead>
            <tr>
              <th className="w-12"></th> {/* Adjusted width */}
              <th className="text-lg px-4 py-2">Id</th>
              <th className="text-lg px-4 py-2">Nama Penilai</th>
              <th className="text-lg px-4 py-2">Posisi Penilai</th>
              <th className="text-lg px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listEvaluator.map((evaluator) => (
              <tr
                key={evaluator.evaluator_id}
                className={`${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    // id={`checkbox-${evaluator.id}`} // Make ID unique
                    checked={selectedIds.includes(evaluator.evaluator_id)}
                    onChange={(e) =>
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, evaluator.evaluator_id]
                          : prev.filter(
                              (selectedId) =>
                                selectedId !== evaluator.evaluator_id
                            )
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td className="px-4 py-2">{evaluator.evaluator_id}</td>
                <td className="px-4 py-2">
                  <label htmlFor={`checkbox-${evaluator.evaluator_id}`}>
                    {" "}
                    {/* Match label to a unique checkbox ID if needed */}
                    {evaluator.evaluator_name}
                  </label>
                </td>
                <td className="px-4 py-2">{evaluator.evaluator_position}</td>
                <td className="px-4 py-2">
                  {/* Replace Link with button to set page state */}
                  <button
                    className="btn btn-sm btn-primary flex items-center gap-x-1"
                    onClick={() => {
                      // set page to update view (2.1)
                      // usePageState.getState().setCurrentPage(2.1);
                      window.location.href = `/senarai-penilai-dalaman/${evaluator.evaluator_id}/butiran-penilai`;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />{" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />{" "}
                    </svg>
                    <span className="hidden md:block">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-8 justify-center w-full px-4 gap-2 md:px-0">
          <button
            className="btn btn-success text-white gap-2 mb-4"
            onClick={() => {
              setModalOpen(true);
              if (allEvaluators.length === 0) {
                fetchAllEvaluators();
              }
            }}
          >
            <svg
              className="w-5 h-5 text-white mr-2"
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
            Tambah Penilai
          </button>
          {selectedIds.length > 0 && (
            <div className="flex gap-2">
              <button
                className="btn btn-error gap-2"
                onClick={() =>
                  Swal.fire({
                    title: "Padam Penilai?",
                    text: `Anda pasti untuk padam ${
                      selectedIds.length > 1
                        ? selectedIds.length + " penilai yang dipilih"
                        : "penilai yang dipilih"
                    }!`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Hapus",
                    cancelButtonText: "Batal",
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
              {selectedIds.length === 1 && (
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    const evaluator = listEvaluator.find(
                      (e) => e.evaluator_id === selectedIds[0]
                    );
                    if (evaluator) handleEditPosition(evaluator);
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
                  <span className="hidden md:inline">Edit Posisi</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <AddEvaluatorModal />
      <EditPositionModal />
    </div>
  );
};

export default Evaluator_List;
