/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
// import { set } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface payment {
  id: number;
  payment_date: string;
  payment_amount: number;
  payment_proof_path: string;
  payment_type: string;
}

const Payment_view = () => {
  const [listPayment, setListPayment] = useState<payment[]>([]);
  //   const [error, setError] = useState<string | null>(null);
  const { program_id, name } = useParams();
  // const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [file, setFile] = useState<string | null>(null);

  const getPaymentList = async () => {
    try {
      const response = await axios.get<payment[]>(
        `http://localhost:5000/payment-records/senarai-rekod-pembayaran/${program_id}`
      );
      setListPayment(response.data);
      setFile(response.data[0].payment_proof_path);
      console.table(response.data);
    } catch (error) {
      Swal.fire({
        icon: "info",
        title: "Tiada Rekod Pembayaran",
        text: "Sila tambah rekod pembayaran",
        // text: "Something went wrong!",
        // footer: `Error: ${(error as Error).message}`,
      });
      console.error(error as any);
      //   setError(error as any);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col duration-300 ">
      <h1 className="text-xl font-medium mt-4 mb-4">
        Rekod Bayaran Program: <span className="font-bold">{name}</span>
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-6">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li>
          <li>Rekod Bayaran Program</li>
        </ul>
      </div>

      <div className="flex flex-col items-center">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              {/* <th></th> */}
              <th className="text-lg">Id</th>
              <th className="text-lg">Jenis Bayaran</th>
              <th className="text-lg">Tarikh Bayaran</th>
              <th className="text-lg">Jumlah Bayaran</th>
              <th className="text-lg">Bukti Bayaran</th>
              <th className="text-lg">Butiran Penuh</th>
            </tr>
          </thead>
          <tbody>
            {listPayment.map((payment) => (
              <tr key={payment.id}>
                {/* <td>
                  <input
                    type="checkbox"
                    id={payment.payment_type}
                    checked={selectedIds.includes(payment.id)}
                    onChange={(e) =>
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, payment.id]
                          : prev.filter((id) => id !== payment.id)
                      )
                    }
                    className="checkbox checkbox-primary"
                  />
                </td> */}
                <td>{payment.id}</td>
                <td>
                  <label htmlFor={payment.payment_type}>
                    {payment.payment_type}
                  </label>
                </td>
                <td>{dayjs(payment.payment_date).format("DD/MM/YYYY")}</td>
                <td>RM {payment.payment_amount}</td>
                <td>
                  <Link to={`http://localhost:5000${file}`} target="_blank">
                    <button className="btn btn-sm btn-outline btn-primary flex items-center gap-x-1">
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
                      <span className="hidden md:block">Lihat</span>
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/rekod-pembayaran/butiran-rekod-pembayaran/${program_id}/${payment.id}/${name}`}
                  >
                    <button className="btn btn-sm btn-soft btn-primary flex items-center gap-x-1">
                      {/* <svg
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
                      </svg> */}
                      <FaEye className="w-4 h-4" />
                      <span className="hidden md:block">Tunjuk</span>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-8">
          <Link
            to={`/rekod-pembayaran/tambah-rekod-pembayaran/${program_id}/${name}`}
          >
            <button className="btn bg-[#28a745] text-white hover:bg-[#218838] mr-4">
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
              Tambah Rekod Pembayaran
            </button>
          </Link>

          {/* Action Buttons */}
          {/* {selectedIds.length > 0 && (
            <div className="flex gap-4 mb-4 justify-end">
              <button
                className="btn btn-error gap-2"
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
                      //   handleDelete(selectedIds);
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
                <Link to={``}>
                  <button className="btn btn-warning gap-2">
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
                </Link>
              )}
            </div>
          )} */}
          {/* Action Button */}
        </div>
      </div>
    </div>
  );
};

export default Payment_view;
