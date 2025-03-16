import { FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Accreditation_list = () => {
  const { id, nama_program } = useParams();

  return (
    <div className={`container mt-5 mx-auto h-screen p-4`}>
      <h1 className="text-xl font-bold  mt-4 mb-4">
        Rekod Akreditasi : <span className="font-bold">{nama_program}</span>{" "}
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
          <li>Rekod Akreditasi Program: {nama_program}</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <div className="flex  flex-col items-end">
        <div>
          <Link
            to={`/akreditasi-program/${id}/daftar-akreditasi/${nama_program}`}
          >
            <button className="btn btn-warning my-4">
              <FaRegEdit className="w-8" /> Tambah Akreditasi
            </button>
          </Link>
        </div>
        <table className="table border  border-base-content/5 rounded-box w-full">
          <thead>
            <tr>
              <td>ID Akreditasi</td>
              <td>File Akreditasi</td>
              <td>Jenis Akreditasi</td>
              <td>Tarikh Tamat Akreditasi</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Accreditation_list;
