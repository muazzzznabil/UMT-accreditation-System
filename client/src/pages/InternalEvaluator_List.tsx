import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Evaluator {
  id: number;
  name: string;
  evaluator_name: string;
  evaluator_email: string;
  evaluator_faculty: string;
}

const Evaluator_List = () => {
  const { id, name } = useParams();
  const [listEvaluator, setListEvaluator] = useState<Evaluator[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const fetchEvaluators = async () => {
    try {
      const response = await axios.get<Evaluator[]>(
        `http://localhost:5000/penilai-dalaman/penilai/${id}/program`
      );
      setListEvaluator(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  // const handleDelete = async () => {
  //   try {
  //     await Promise.all(
  //       selectedIds.map((id) =>
  //         axios.delete(`http://localhost:5000/penilai-dalaman/penilai/${id}`)
  //       )
  //     );
  //     setSelectedIds([]);
  //     fetchEvaluators();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedIds(e.target.checked ? listEvaluator.map((e) => e.id) : []);
  // };

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col  duration-300">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Penilai Dalaman Program: <span className="font-bold">{name}</span>
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
          <li>Senarai Penilai Dalaman</li>
        </ul>
      </div>

      <div className="flex flex-col items-center">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th></th>
              <th className="text-lg">Id</th>
              <th className="text-lg">Nama Penilai</th>
              <th className="text-lg">Fakulti</th>
              <th className="text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listEvaluator.map((evaluator) => (
              <tr key={evaluator.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(evaluator.id)}
                    onChange={(e) =>
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, evaluator.id]
                          : prev.filter((id) => id !== evaluator.id)
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td>{evaluator.id}</td>
                <td>{evaluator.evaluator_name}</td>
                <td>{evaluator.evaluator_faculty}</td>
                <td>
                  <button className="btn btn-sm btn-primary flex items-center gap-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="hidden w-[1051]:block lg:block md:block sm:block">
                      View
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-8">
          <Link to={`/daftar-penilai/${id}/${name}`}>
            <button className="btn bg-[#28a745] text-white hover:bg-[#218838] w-1/8 mr-4">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Tambah Penilai
            </button>
          </Link>

          {/* Action Buttons */}
          {selectedIds.length > 0 && (
            <div className="flex gap-4 mb-4 justify-end ">
              <button className="btn btn-error gap-2">
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

              <button className="btn btn-warning gap-2  ">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Evaluator_List;
