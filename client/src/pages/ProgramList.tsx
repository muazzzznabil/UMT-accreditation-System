import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Program {
  id: number;
  nama_program: string;
  fakulti: string;
}

const ProgramList: React.FC = () => {
  const [listProgram, setListProgram] = useState<Program[]>([]); // Ensure it's initialized as an empty array
  const [error, setError] = useState<string | null>(null);

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        "http://localhost:5000/pendaftaran-program/maklumat-program"
      );
      setListProgram(response.data);

      console.table(response.data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError(error.message);
      console.error("Error fetching programs:", error.message);
    }
  };

  const deleteProgram = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/delete`
      );

      setListProgram(listProgram.filter((program) => program.id !== id));
      if (response.status === 200) {
        Swal.fire({
          title: "Dihapus!",
          text: "Program berjaya dihapus.",
          icon: "success",
        });
        console.log("Program deleted:", response.data);
      }
    } catch (error: unknown) {
      setError("Error deleting program: " + (error as Error).message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Error deleting program: " + (error as Error).message,
      });
    }
  };

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col duration-300 ">
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
        <div
          role="alert"
          className="alert alert-error fixed max-w-screen-2xl bottom-10 ease-in "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
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
          <span>Error fetching programs !</span>
        </div>
      )}

      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th className="text-lg">Id</th>
            <th className="text-lg">Program</th>
            <th className="text-lg">Fakulti</th>
            <th className="text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listProgram.map((program) => (
            <tr key={program.id}>
              {" "}
              {/* Important: Add a unique key */}
              <td>{program.id}</td>
              {/* <td>{program.nama_program}</td> */}
              <td className="hover:underline">
                <a href={`/ProgramInfo/${program.id}`}>
                  {program.nama_program}
                </a>
              </td>
              <td>{program.fakulti}</td>
              <td>
                {/* Your action buttons/links here */}
                <button
                  onClick={() =>
                    (window.location.href = `/edit-program/${program.id}`)
                  }
                  className="mr-2 btn btn-primary text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    //   if (
                    //     window.confirm(
                    //       "Are you sure you want to delete this program?"
                    //     )
                    //   ) {
                    //     deleteProgram(program.id);
                    //   }
                    Swal.fire({
                      title: "Padam Program?",
                      text: `Anda pasti untuk padam program ${program.nama_program} !`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Hapus",
                      // })
                      // .then((result) => {
                      //   if (result.isConfirmed) {
                      //     Swal.fire({
                      //       title: "Dihapus!",
                      //       text: "Program berjaya dihapus.",
                      //       icon: "success",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteProgram(program.id);
                      } else if (result.isDenied) {
                        Swal.fire("Changes are not saved", "", "info");
                      }
                    });
                    //   }
                    // });
                  }}
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
  );
};

export default ProgramList;
