import { useParams } from "react-router-dom";
import { usePageState } from "../utils/usePageState";

import Evaluator_List from "./InternalEvaluator_List";
import ViewFullProgram from "./ViewFullProgram";
import Application_program from "./application_program";
import Application_register from "./application_register";
// import InternalEvaluator_update from "./InternalEvaluator_update"; // import the update page
import AllEvaluator_view from "./AllEvaluator_view";
// import Maklumbalas_List from "./Maklumbalas_List";
import Payment_view from "./payment_view";
import Payment_register from "./payment_register";
import Accreditation_list from "./accreditationRecords_list";
import UpdateMaklumat from "./updateMaklumat";
import ReportGenerator, { ReportFilters } from "./ReportGenerator";
import Swal from "sweetalert2";

const Program_view = () => {
  const { id, name } = useParams();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const { currentPage, setCurrentPage } = usePageState();

  const handleGenerateReport = async (filters: ReportFilters) => {
    if (!id) return;
    try {
      const response = await fetch(`${VITE_DATABASE_HOST}/report/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program_id: id, name, filters }),
      });
      if (!response.ok) throw new Error("Failed to generate report");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `Error: ${(err as Error).message}`,
      });
    }
  };

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {/* {pageIndex === 1.1 && (
            <div className={`container mt-5 mx-auto p-4`}>
              <h1 className="text-xl font-semibold mb-4">{name}</h1>

              BreadCrumbs
              <div className="breadcrumbs text-md mb-2">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Program: {name}</li>
                </ul>
              </div>
              BreadCrumbs
            </div>
          )} */}
          {currentPage === 1.1 && <ViewFullProgram />}
          {currentPage === 1.2 && <UpdateMaklumat />}
          {currentPage === 2 && <Evaluator_List />}
          {currentPage === 1.3 && <AllEvaluator_view />}
          {/* {currentPage === 2.2 && } */}
          {/* show update page */}
          {currentPage === 3.1 && (
            <Application_program program_id={Number(id)} />
          )}
          {currentPage === 3.2 && <Application_register program_name={name} />}
          {/* {currentPage === 4.1 && <Maklumbalas_List />} */}
          {currentPage === 5 && <Payment_view />}
          {currentPage === 5.1 && <Payment_register />}
          {currentPage === 6 && <Accreditation_list />}
          {currentPage === 7 && (
            <ReportGenerator onGenerate={handleGenerateReport} />
          )}
          {/*//! <label
             htmlFor="my-drawer-2"
             className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
         //! </label> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <details open>
                <summary className="font-semibold">
                  {" "}
                  {/* <a onClick={() => setPageIndex(0)}> */}
                  <span className="font-semibold">{name}</span>
                  {/* </a> */}
                </summary>
                <ul>
                  <li>
                    <details open>
                      <summary>Maklumat Program</summary>
                      <ul>
                        <li>
                          <a
                            onClick={() => setCurrentPage(1.1)}
                            className={`${
                              currentPage === 1.1
                                ? "menu-active text-primary bg-base-300"
                                : "text-base-content"
                            }`}
                          >
                            Butiran Program
                          </a>
                        </li>
                        {currentPage === 1.2 && (
                          <li>
                            <a
                              onClick={() => setCurrentPage(1.2)}
                              className={`${
                                currentPage === 1.2
                                  ? "menu-active text-primary bg-base-300"
                                  : "text-base-content"
                              }`}
                            >
                              Kemaskini Maklumat Program
                            </a>
                          </li>
                        )}
                        {/* <li>
                          <a></a>
                        </li> */}
                      </ul>
                    </details>
                  </li>
                  <li>
                    <a
                      onClick={() => setCurrentPage(2)}
                      className={`${
                        currentPage === 2
                          ? "menu-active text-primary bg-base-300"
                          : "text-base-content"
                      }`}
                    >
                      Penilai Dalaman
                    </a>
                  </li>
                  <li>
                    <details open>
                      <summary> Permohonan Akreditasi</summary>
                      <ul>
                        <li>
                          <a
                            onClick={() => setCurrentPage(3.1)}
                            className={`${
                              currentPage === 3.1
                                ? "menu-active text-primary bg-base-300"
                                : "text-base-content"
                            }`}
                          >
                            Senarai Permohonan Akreditasi
                          </a>
                        </li>
                        {currentPage === 3.2 && (
                          <li>
                            <a
                              onClick={() => setCurrentPage(3.2)}
                              className={`${
                                currentPage === 3.2
                                  ? "menu-active text-primary bg-base-300"
                                  : "text-base-content"
                              }`}
                            >
                              Tambah Permohonan
                            </a>
                          </li>
                        )}
                      </ul>
                    </details>
                  </li>
                  {/* <li>
                    <a
                      onClick={() => setCurrentPage(4)}
                      className={`${
                        currentPage === 4
                          ? "menu-active text-primary bg-base-300"
                          : "text-base-content"
                      }`}
                    >
                      Maklumbalas MQA
                    </a>
                  </li> */}
                  <li>
                    <details open>
                      <summary>Rekod Pembayaran</summary>
                      <ul>
                        {" "}
                        <li>
                          <a
                            onClick={() => setCurrentPage(5)}
                            className={`${
                              currentPage === 5
                                ? "menu-active text-primary bg-base-300"
                                : "text-base-content"
                            }`}
                          >
                            Rekod Pembayaran
                          </a>
                        </li>
                        {currentPage === 5.1 && (
                          <li>
                            <a
                              className={`${
                                currentPage === 5.1
                                  ? "menu-active text-primary bg-base-300"
                                  : "text-base-content"
                              }`}
                            >
                              Tambah Rekod Pembayaran
                            </a>
                          </li>
                        )}
                      </ul>
                    </details>
                  </li>
                  <li>
                    <a
                      onClick={() => setCurrentPage(6)}
                      className={`${
                        currentPage === 6
                          ? "menu-active text-primary bg-base-300"
                          : "text-base-content"
                      }`}
                    >
                      Pendaftaran Akreditasi
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setCurrentPage(7)}
                      className={`${
                        currentPage === 7
                          ? "menu-active text-primary bg-base-300"
                          : "text-base-content"
                      }`}
                    >
                      Generate Report
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Program_view;
