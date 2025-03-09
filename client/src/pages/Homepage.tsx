// import { Links } from "react-router-dom";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <body className="m-12 flex justify-center items-center h-96 ">
        <div className="">
          <h1 className="text-3xl font-medium">Navigation</h1>
          <ul className="list-disc pl-5 py-3">
            <li className="list-item">
              <Link
                to="/MsaForm_onepage"
                className="text-blue-500 hover:underline"
              >
                Daftar Permohonan Program
              </Link>
            </li>
            <li>
              <Link
                to="/program-list"
                className="text-blue-500 hover:underline"
              >
                Program List
              </Link>
            </li>
            <li>
              <Link
                to="/testMultiStepForm"
                className="text-blue-500 hover:underline"
              >
                Test Multi-Step Form
              </Link>
            </li>
          </ul>
        </div>
      </body>
    </>
  );
};

export default Homepage;
