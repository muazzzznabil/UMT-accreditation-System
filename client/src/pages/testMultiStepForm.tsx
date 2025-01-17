import axios from "axios";
import React, { useState } from "react";

interface info {
  nama: string;
  age: number;
  eduInfo: string;
  file: string;
  fileContent: string;
}

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const [ setState] = useState("idle");
  const [file, setFile] = useState<File | undefined>();
  // const [ setPreview] = useState<string | ArrayBuffer | null>(null);
  const [data, setData] = useState<info | null>(null);
  const [id, setId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (typeof file === "undefined") return;

    const target = e.target as typeof e.target & {
      nama: { value: string };
      university: { value: string };
      pdfFile: { value: string };
    };

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("nama", target.nama.value);
    formData.append("eduInfo", target.university.value);

    const result = await axios.post(
      "http://localhost:5000/pendaftaran-program/maklumat-program-file-test",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("result", result);
    console.log("pdfFile", target.pdfFile.value);
    console.log("pdfFile", file);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === null) {
      alert("Please enter an ID.");
      return;
    }

    try {
      const response = await axios.get<info>(
        `http://localhost:5000/pendaftaran-program/maklumat-program-file-test/${id}/get`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Record not found or an error occurred.");
      setData(null);
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
    const file = new FileReader();

    file.onload = function () {
      console.log("file.result", file.result);
      // setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
    console.log("file", file);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="tabs flex justify-center mb-4">
        <button
          className={`tab tab-bordered ${activeTab === 0 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          User Info
        </button>
        <button
          className={`tab tab-bordered ${activeTab === 1 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Parent Info
        </button>
        <button
          className={`tab tab-bordered ${activeTab === 2 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Education Info
        </button>
      </div>

      <form
        className="flex flex-col items-center"
        encType="multipart/form-data"
        onSubmit={handleOnSubmit}
        method="POST"
      >
        {/* {activeTab === 0 && ( */}
        <div className="mb-4 flex flex-col items-center ">
          <h2 className="text-xl font-bold mb-2">User Info</h2>
          <input
            className="input input-bordered w-full max-w-xs mb-4"
            name="nama"
            placeholder="Enter your name"
            // value={formData.userInfo.name}
            // onChange={(e) => handleInputChange("userInfo", e)}
          />
          <input
            className="input input-bordered w-full max-w-xs mb-4"
            name="age"
            type="number"
            placeholder="Enter your Age"
            // value={formData.userInfo.name}
            // onChange={(e) => handleInputChange("userInfo", e)}
          />
          <input
            className="input input-bordered w-full max-w-xs mb-4"
            name="university"
            placeholder="Enter your university name"
            // value={formData.userInfo.name}
            // onChange={(e) => handleInputChange("userInfo", e)}
          />
          <input
            type="file"
            name="pdfFile"
            id="pdfFile"
            className="file-input file-input-bordered w-full max-w-xs mb-4"
            accept=".pdf"
            onChange={handleOnChange}
          />
          {/* <img src={preview} /> */}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="flex flex-col items-center">
        <form
          className="flex  items-center mt-32"
          onSubmit={handleSearch}
          method="GET"
        >
          <label htmlFor="id" className="label-input-msa mx-2">
            ID
          </label>
          <input
            type="number"
            name="id"
            id="id"
            className="input input-bordered"
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <input
            type="submit"
            name="submit"
            id="submit"
            className="btn btn-primary mx-2"
          />
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Display Data */}
        {data && (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">University</th>
                <th className="px-4 py-2">File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{data.nama}</td>
                <td className="border px-4 py-2">{data.age}</td>
                <td className="border px-4 py-2">{data.eduInfo}</td>
                <td className="border px-4 py-2">
                  <a
                    href={`http://localhost:5000${data.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {data.file}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TabbedForm;
