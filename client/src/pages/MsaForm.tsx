import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";


const MsaForm : React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
      <SectionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* {activeTab === 1 && 
        <MaklumatProgram 
        data={formData.maklumatProgram}      
        updateData={(data) => updateFormData("maklumatProgram", data)}
        />} */}
        {activeTab === 1 && <MaklumatProgram />}
        {activeTab === 2 && <MesyJPKT />}
        {activeTab === 3 && <MesyJKA />}
      
    </div>
  );
};

export default MsaForm;
