import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";

// interface MaklumatProgramData {
//   nama_program?: string;
//   tahapKKM?: string;
//   sektorAkademik? : string;
//   code_nec?: string;
//   mode_penawaran?: string;
//   fakulti?: string;

//   Sepenuh_SemesterPanjang_tahun?: string;
//   Sepenuh_SemesterPanjang_bulan?: string;
//   Sepenuh_SemesterPanjang_Semester?: string;
//   Sepenuh_SemesterPendek_tahun?: string;
//   Sepenuh_SemesterPendek_bulan?: string;
//   Sepenuh_SemesterPendek_Semester?: string;
//   Sepenuh_LatihanIndustri_tahun?: string;
//   Sepenuh_LatihanIndustri_bulan?: string;
//   Sepenuh_LatihanIndustri_Semester?: string;

//   Separuh_SemesterPanjang_tahun?: string;
//   Separuh_SemesterPanjang_bulan?: string;
//   Separuh_SemesterPanjang_Semester?: string;
//   Separuh_SemesterPendek_tahun?: string;
//   Separuh_SemesterPendek_bulan?: string;
//   Separuh_SemesterPendek_Semester?: string;
//   Separuh_LatihanIndustri_tahun?: string;
//   Separuh_LatihanIndustri_bulan?: string;
//   Separuh_LatihanIndustri_Semester?: string; 

//   mod_penyampaian?: string;
//   struktur_program?: string;
//   program_kerjasama?: string;
//   jenis_kerjasama?: string;

// }

// interface MesyJPKTData {
//   meetingDate?: string;
//   notes?: string;
  
// }

// interface MesyJKAData {
//   approvalStatus?: string;
//   comments?: string;
  
// } 

// interface FormData {
//   maklumatProgram: MaklumatProgramData;
//   mesyJPKT: MesyJPKTData;
//   mesyJKA: MesyJKAData;
// }



const MsaForm : React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const [activeTab, setActiveTab] = useState<number>(1);

  // const [formData, setFormData] = useState<FormData>({ 
  //   maklumatProgram: {},
  //   mesyJPKT: {},
  //   mesyJKA: {},
  // });


  // const updateFormData = <K extends keyof FormData>(
  //   key: K,
  //   data: FormData[K]
  // ) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [key]: data,
  //   }));
  // };

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
