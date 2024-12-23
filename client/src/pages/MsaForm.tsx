import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";

const MsaForm = () => {
  const breadcrumbs = useBreadcrumbs();
  const [activeTab, setActiveTab] = useState(1);

  //To send all data to backend from the tabs forms
  //create a state of Object 
  //exp:
  //const [user, setUser] = useState<User>({ name: '', age: 0 });
  //send Info to backend as JSON

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
      <SectionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <form >
        {activeTab === 1 && <MaklumatProgram />}
        {activeTab === 2 && <MesyJPKT />}
        {activeTab === 3 && <MesyJKA />}
      </form>
    </div>
  );
};

export default MsaForm;
