import React, { useState } from "react";

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    userInfo: { name: "" },
    parentInfo: { parentName: "" },
    educationInfo: { degree: "" },
  });

  const handleInputChange = (section, event) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [event.target.name]: event.target.value,
      },
    });
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

      <div className="flex flex-col items-center">
        {activeTab === 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">User Info</h2>
            <input
              className="input input-bordered w-full max-w-xs"
              name="name"
              placeholder="Enter your name"
              value={formData.userInfo.name}
              onChange={(e) => handleInputChange("userInfo", e)}
            />
          </div>
        )}
        {activeTab === 1 && (
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
        )}
        <button
          onClick={() => console.log(formData)}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TabbedForm;