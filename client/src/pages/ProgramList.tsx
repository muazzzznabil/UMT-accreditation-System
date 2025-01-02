import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface Program {
  id: number;
  nama_program: string;
  fakulti: string;
}

const ProgramList: React.FC = () => {
  const [listProgram, setListProgram] = useState<Program[]>([]);  // Ensure it's initialized as an empty array
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
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/delete`);

        setListProgram(listProgram.filter((program) => program.id !== id));
      if (response.status === 200) {
        console.log("Program deleted:", response.data);
      }
    } catch (error: unknown) {
      setError("Error deleting program: " + (error as Error).message);
      console.error(error as Error);
    }
  }

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl font-bold p-2 my-4">PROGRAM</h1>

      {/* {error && (
        <div className="alert alert-error">
          <p>Error fetching data: {error}</p>
        </div>
      )} */}

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
            <tr key={program.id}>  {/* Important: Add a unique key */}
              <td>{program.id}</td>
              <td>{program.nama_program}</td>
              <td>{program.fakulti}</td>
              <td>
                {/* Your action buttons/links here */}
                <button className="mr-2 btn btn-primary text-white">Edit</button>
                <button onClick={() => deleteProgram(program.id)} className="btn btn-error text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramList;
