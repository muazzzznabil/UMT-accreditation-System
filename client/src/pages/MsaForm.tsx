import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";
import { MesyJKPT } from "../model/mesyJKPT_model.js";
import { MaklumatProgramModel } from "../model/maklumat_program_model.js";

const MsaForm: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [jkpt] = useState(new MesyJKPT());
  const [mp] = useState(new MaklumatProgramModel());

  const submitData = {
    nama_program: mp.getNamaProgram(),
    tahapMQF: mp.getTahapMQF(),
    sektorAkademik: mp.getSektorAkademik(),
    code_nec: mp.getCodeNEC,
    mode_penawaran: mp.getModePenawaran(),
    fakulti: mp.getFakulti(),
    Sepenuh_max_Tahun: mp.getSepenuhMaxTahun(),
    Sepenuh_max_Minggu: mp.getSepenuhMaxMinggu(),
    Sepenuh_max_Semester: mp.getSepenuhMaxSemester(),
    Sepenuh_min_Tahun: mp.getSepenuhMinTahun(),
    Sepenuh_min_Minggu: mp.getSepenuhMinMinggu(),
    Sepenuh_min_Semester: mp.getSepenuhMinSemester(),
    Sepenuh_SemesterPanjang_Semester: mp.getSepenuhSemesterPanjangSemester(),
    Sepenuh_SemesterPendek_Semester: mp.getSepenuhSemesterPendekSemester(),
    Sepenuh_LatihanIndustri_Semester: mp.getSepenuhLatihanIndustriSemester(),
    Separuh_max_Tahun: mp.getSeparuhMaxTahun(),
    Separuh_max_Minggu: mp.getSeparuhMaxMinggu(),
    Separuh_max_Semester: mp.getSeparuhMaxSemester(),
    Separuh_min_Tahun: mp.getSeparuhMinTahun(),
    Separuh_min_Minggu: mp.getSeparuhMinMinggu(),
    Separuh_min_Semester: mp.getSeparuhMinSemester(),
    Separuh_SemesterPanjang_Semester: mp.getSeparuhSemesterPanjangSemester(),
    Separuh_SemesterPendek_Semester: mp.getSeparuhSemesterPendekSemester(),
    Separuh_LatihanIndustri_Semester: mp.getSeparuhLatihanIndustriSemester(),
    mod_penyampaian: mp.getModPenyampaian(),
    struktur_program: mp.getStrukturProgram(),
    program_kerjasama: mp.getProgramKerjasama(),
    jenis_kerjasama: mp.getJenisKerjasama(),
  };

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl  font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
      <SectionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <form method="POST">
        {activeTab === 1 && <MaklumatProgram mp={mp} />}
        {activeTab === 2 && <MesyJPKT mesyJKPT={jkpt} />}
        {activeTab === 3 && <MesyJKA />}
      </form>
    </div>
  );
};

export default MsaForm;
