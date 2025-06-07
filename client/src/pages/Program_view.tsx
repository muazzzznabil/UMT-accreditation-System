import { useParams } from "react-router-dom";
import { usePageState } from "../utils/usePageState";

import Evaluator_List from "./InternalEvaluator_List";
import ViewFullProgram from "./ViewFullProgram";
import Application_program from "./application_program";
import Application_register from "./application_register";
// import InternalEvaluator_update from "./InternalEvaluator_update"; // import the update page
import AllEvaluator_view from "./AllEvaluator_view";
import Maklumbalas_List from "./Maklumbalas_List";

const Program_view = () => {
  const { id, name } = useParams();
  const { currentPage, setCurrentPage } = usePageState();

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
          {currentPage === 2 && <Evaluator_List />}
          {currentPage === 2.1 && <AllEvaluator_view />}{" "}
          {/* show update page */}
          {currentPage === 3.1 && (
            <Application_program program_id={Number(id)} />
          )}
          {currentPage === 3.2 && (
            <Application_register program_id={Number(id)} program_name={name} />
          )}
          {currentPage === 4 && <Maklumbalas_List />}
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
                      </ul>
                    </details>
                  </li>
                  <li>
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
                  </li>
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
