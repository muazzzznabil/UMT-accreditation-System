import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";

const MsaForm = () => {
  const breadcrumbs = useBreadcrumbs(MaklumatProgram);
  const [activeTab, setActiveTab] = useState(1);

  const onSubmitForm = (e) => {
    e.preventDefault(); 
    try {
      const body ={}
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
      <SectionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <form onSubmit={onSubmitForm}>
        {activeTab === 1 && <MaklumatProgram />}
        {activeTab === 2 && <MesyJPKT />}
        {activeTab === 3 && <MesyJKA />}
      </form>
    </div>
  );
};

export default MsaForm;
