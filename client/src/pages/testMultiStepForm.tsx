import React, { useState } from "react";

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [state, setState] = useState("idle");
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  // const [formData, setFormData] = useState({
  //   userInfo: { name: "" },
  //   resume: { resume: "" },
  //   parentInfo: { parentName: "" },
  //   educationInfo: { degree: "" },
  // });

  // const handleInputChange = (
  //   section: keyof typeof formData,
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [section]: {
  //       ...prevFormData[section],
  //       [event.target.name]: event.target.value,
  //     },
  //   }));
  // };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (typeof file === "undefined") return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "test-file-upload");
    formData.append("api_key", "957986236731421");

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dp2ktjxqn/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log("result", result);

    console.log("pdfFile", e.target.pdfFile.value);
    console.log("pdfFile", file);

    setState("sent");
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
    const file = new FileReader();

    file.onload = function () {
      console.log("file.result", file.result);
      setPreview(file.result);
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
            name="name"
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
            onChange={handleOnChange}
          />
          <img src={preview} />
        </div>
        {/* )} */}
        {/* {activeTab === 1 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Parent Info</h2>
            <input
              className="input input-bordered w-full max-w-xs"
              name="parentName"
              placeholder="Enter parent's name"
              value={formData.parentInfo.parentName}
              onChange={(e) => handleInputChange("parentInfo", e)}
            />
          </div>
        )}
        {activeTab === 2 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Education Info</h2>
            <input
              className="input input-bordered w-full max-w-xs"
              name="degree"
              placeholder="Enter your degree"
              value={formData.educationInfo.degree}
              onChange={(e) => handleInputChange("educationInfo", e)}
            />
          </div>
        )} */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TabbedForm;
