import React, { useState } from "react";
import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import SectionNavigation from "../components/msaForm/SectionNavigation";
import MaklumatProgram from "../components/msaForm/MaklumatProgram.js";
import MesyJKA from "../components/msaForm/MesyJKA";
import MesyJPKT from "../components/msaForm/MesyJPKT";
import { MesyJKPT } from "../model/mesyJKPT_model.js";
import { MaklumatProgramModel } from "../model/maklumat_program_model.js";
import axios from "axios";

const MsaForm: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [jkpt] = useState(new MesyJKPT());
  const [mp] = useState(new MaklumatProgramModel());
  const [formData] = useState(new FormData());

  const handelSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const sahSehingga = jkpt.getSahSehingga();

    // formData.append("nama_program", mp.getNamaProgram());
    // formData.append("tahapMQF", mp.getTahapMQF());
    // formData.append("sektorAkademik", mp.getSektorAkademik());
    // formData.append("code_nec", mp.getCodeNEC());
    // formData.append("mode_penawaran", mp.getModePenawaran());
    // formData.append("fakulti", mp.getFakulti());
    // formData.append("Sepenuh_max_Tahun", mp.getSepenuhMaxTahun().toString());
    // formData.append("Sepenuh_max_Minggu", mp.getSepenuhMaxMinggu().toString());
    // formData.append(
    //   "Sepenuh_max_Semester",
    //   mp.getSepenuhMaxSemester().toString()
    // );
    // formData.append("Sepenuh_min_Tahun", mp.getSepenuhMinTahun().toString());
    // formData.append("Sepenuh_min_Minggu", mp.getSepenuhMinMinggu().toString());
    // formData.append(
    //   "Sepenuh_min_Semester",
    //   mp.getSepenuhMinSemester().toString()
    // );
    // formData.append(
    //   "Sepenuh_SemesterPanjang_Semester",
    //   mp.getSepenuhSemesterPanjangSemester().toString()
    // );
    // formData.append(
    //   "Sepenuh_SemesterPendek_Semester",
    //   mp.getSepenuhSemesterPendekSemester().toString()
    // );
    // formData.append(
    //   "Sepenuh_LatihanIndustri_Semester",
    //   mp.getSepenuhLatihanIndustriSemester().toString()
    // );
    // formData.append("Separuh_max_Tahun", mp.getSeparuhMaxTahun().toString());
    // formData.append("Separuh_max_Minggu", mp.getSeparuhMaxMinggu().toString());
    // formData.append(
    //   "Separuh_max_Semester",
    //   mp.getSeparuhMaxSemester().toString()
    // );
    // formData.append("Separuh_min_Tahun", mp.getSeparuhMinTahun().toString());
    // formData.append("Separuh_min_Minggu", mp.getSeparuhMinMinggu().toString());
    // formData.append(
    //   "Separuh_min_Semester",
    //   mp.getSeparuhMinSemester().toString()
    // );
    // formData.append(
    //   "Separuh_SemesterPanjang_Semester",
    //   mp.getSeparuhSemesterPanjangSemester().toString()
    // );
    // formData.append(
    //   "Separuh_SemesterPendek_Semester",
    //   mp.getSeparuhSemesterPendekSemester().toString()
    // );
    // formData.append(
    //   "Separuh_LatihanIndustri_Semester",
    //   mp.getSeparuhLatihanIndustriSemester().toString()
    // );
    // formData.append("mod_penyampaian", mp.getModPenyampaian());
    // formData.append("struktur_program", mp.getStrukturProgram());
    // formData.append("program_kerjasama", mp.getProgramKerjasama());
    // formData.append("jenis_kerjasama", mp.getJenisKerjasama());
    // formData.append("tarikhSurat", jkpt.getTarikhSurat().toISOString());
    // formData.append(
    //   "tarikhTerimaSurat",
    //   jkpt.getTarikhTerimaSurat().toISOString()
    // );
    // formData.append("tarikhMesyuarat", jkpt.getTarikhMesyuarat().toISOString());
    // formData.append("sahSehingga", jkpt.getSahSehingga().toISOString());

    // const maklumatData = {
    //   nama_program: mp.getNamaProgram(),
    //   tahapMQF: mp.getTahapMQF(),
    //   sektorAkademik: mp.getSektorAkademik(),
    //   code_nec: mp.getCodeNEC(),
    //   mode_penawaran: mp.getModePenawaran(),
    //   fakulti: mp.getFakulti(),
    //   Sepenuh_max_Tahun: mp.getSepenuhMaxTahun(),
    //   Sepenuh_max_Minggu: mp.getSepenuhMaxMinggu(),
    //   Sepenuh_max_Semester: mp.getSepenuhMaxSemester(),
    //   Sepenuh_min_Tahun: mp.getSepenuhMinTahun(),
    //   Sepenuh_min_Minggu: mp.getSepenuhMinMinggu(),
    //   Sepenuh_min_Semester: mp.getSepenuhMinSemester(),
    //   Sepenuh_SemesterPanjang_Semester: mp.getSepenuhSemesterPanjangSemester(),
    //   Sepenuh_SemesterPendek_Semester: mp.getSepenuhSemesterPendekSemester(),
    //   Sepenuh_LatihanIndustri_Semester: mp.getSepenuhLatihanIndustriSemester(),
    //   Separuh_max_Tahun: mp.getSeparuhMaxTahun(),
    //   Separuh_max_Minggu: mp.getSeparuhMaxMinggu(),
    //   Separuh_max_Semester: mp.getSeparuhMaxSemester(),
    //   Separuh_min_Tahun: mp.getSeparuhMinTahun(),
    //   Separuh_min_Minggu: mp.getSeparuhMinMinggu(),
    //   Separuh_min_Semester: mp.getSeparuhMinSemester(),
    //   Separuh_SemesterPanjang_Semester: mp.getSeparuhSemesterPanjangSemester(),
    //   Separuh_SemesterPendek_Semester: mp.getSeparuhSemesterPendekSemester(),
    //   Separuh_LatihanIndustri_Semester: mp.getSeparuhLatihanIndustriSemester(),
    //   mod_penyampaian: mp.getModPenyampaian(),
    //   struktur_program: mp.getStrukturProgram(),
    //   program_kerjasama: mp.getProgramKerjasama(),
    //   jenis_kerjasama: mp.getJenisKerjasama(),
    //   tarikhSurat: jkpt.getTarikhSurat().toISOString(),
    //   tarikhTerimaSurat: jkpt.getTarikhTerimaSurat().toISOString(),
    //   tarikhMesyuarat: jkpt.getTarikhMesyuarat().toISOString(),
    //   sahSehingga: jkpt.getSahSehingga().toDateString(),
    //   minitJKPT: jkpt.getMinitJKPT(),
    // };
    // if (sahSehingga instanceof Date && !isNaN(sahSehingga.getTime())) {
    //   formData.append("sahSehingga", sahSehingga.toISOString());
    // } else {
    //   console.log("sahSehingga", sahSehingga);
    //   console.warn("Invalid sahSehingga value, skipping append:", sahSehingga);
    // }
    // formData.append("tempohSah", jkpt.getTempohSah().toString());
    // formData.append("bilMesyuarat", jkpt.getBilMesyuarat());
    console.log(formData);

    const response = await axios.post(
      "http://localhost:5000/pendaftaran-program/maklumat-program",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      alert("Data Berjaya Disimpan");
      window.location.href = "/program-list";
    } else {
      alert("Data Gagal Disimpan");
    }
  };

  return (
    <div className="container mx-auto mt-5 font-sans flex flex-col">
      <h1 className="text-xl  font-bold">PERMOHONAN PROGRAM</h1>
      <BreadcrumbsWithIcon items={breadcrumbs} />
      <SectionNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <form method="POST" onSubmit={handelSubmitForm}>
        {activeTab === 1 && <MaklumatProgram mp={mp} formData={formData} />}
        {activeTab === 2 && <MesyJPKT mesyJKPT={jkpt} formData={formData} />}
        {activeTab === 3 && <MesyJKA />}
      </form>
    </div>
  );
};

export default MsaForm;
