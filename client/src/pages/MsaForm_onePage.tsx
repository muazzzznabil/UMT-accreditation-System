import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import InputField from "../components/msaForm/InputField";
import React, { useState } from "react";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import KKMField from "../components/msaForm/KKMField";
import DropdownMenu from "../components/msaForm/DropdownMenu";
import JangkaPengajianSeparuhMasa from "../components/msaForm/JangkaPengajianSeparuhMasa";
import JangkaPengajianSepenuhMasa from "../components/msaForm/JangkaPengajianSepenuhMasa";
import CheckBox from "../components/msaForm/CheckBox";
import ProgramKerjasama from "../components/msaForm/ProgramKerjasama";
import DatePicker from "../components/msaForm/DatePicker";
import { TarikhSuratContext } from "../components/msaForm/MesyJPKT";
import TempohSah from "../components/msaForm/TempohSah";
import BilMesyuarat from "../components/msaForm/BilMesyuarat";
import MuatNaikSurat from "../components/msaForm/MuatNaikSurat";
import { MesyJKPT } from "../model/mesyJKPT_model";
import { MaklumatProgramModel } from "../model/maklumat_program_model";
import { useForm } from "react-hook-form";
import axios from "axios";

// import Header from "../components/Header";

const MsaForm_onePage = () => {
  const breadcrumbs = useBreadcrumbs();
  const [namaProgram, setNamaProgram] = useState("");
  const [nec, setNec] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");
  //   const [formData] = useState(new FormData());
  //   const formData = new FormData(e.target as HTMLFormElement);
  const [tarikhSurat, setTarikhSurat] = useState("");
  //   const {register,handleSubmit} = useState(useForm());
  //   const { register, handleSubmit } = useForm();
  //   const [jkpt] = useState(new MesyJKPT());
  //   const [mp] = useState(new MaklumatProgramModel());

  const handleSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [key, value] of formData.entries()) {
      console.table(`${key}: ${value}`);
    }
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

  //   const sahSehingga = jkpt.getSahSehingga();

  //   formData.append("nama_program", mp.getNamaProgram());
  //   formData.append("tahapMQF", mp.getTahapMQF());
  //   formData.append("sektorAkademik", mp.getSektorAkademik());
  //   formData.append("code_nec", mp.getCodeNEC());
  //   formData.append("mode_penawaran", mp.getModePenawaran());
  //   formData.append("fakulti", mp.getFakulti());
  //   formData.append("Sepenuh_max_Tahun", mp.getSepenuhMaxTahun().toString());
  //   formData.append("Sepenuh_max_Minggu", mp.getSepenuhMaxMinggu().toString());
  //   formData.append(
  //     "Sepenuh_max_Semester",
  //     mp.getSepenuhMaxSemester().toString()
  //   );
  //   formData.append("Sepenuh_min_Tahun", mp.getSepenuhMinTahun().toString());
  //   formData.append("Sepenuh_min_Minggu", mp.getSepenuhMinMinggu().toString());
  //   formData.append(
  //     "Sepenuh_min_Semester",
  //     mp.getSepenuhMinSemester().toString()
  //   );
  //   formData.append(
  //     "Sepenuh_SemesterPanjang_Semester",
  //     mp.getSepenuhSemesterPanjangSemester().toString()
  //   );
  //   formData.append(
  //     "Sepenuh_SemesterPendek_Semester",
  //     mp.getSepenuhSemesterPendekSemester().toString()
  //   );
  //   formData.append(
  //     "Sepenuh_LatihanIndustri_Semester",
  //     mp.getSepenuhLatihanIndustriSemester().toString()
  //   );
  //   formData.append("Separuh_max_Tahun", mp.getSeparuhMaxTahun().toString());
  //   formData.append("Separuh_max_Minggu", mp.getSeparuhMaxMinggu().toString());
  //   formData.append(
  //     "Separuh_max_Semester",
  //     mp.getSeparuhMaxSemester().toString()
  //   );
  //   formData.append("Separuh_min_Tahun", mp.getSeparuhMinTahun().toString());
  //   formData.append("Separuh_min_Minggu", mp.getSeparuhMinMinggu().toString());
  //   formData.append(
  //     "Separuh_min_Semester",
  //     mp.getSeparuhMinSemester().toString()
  //   );
  //   formData.append(
  //     "Separuh_SemesterPanjang_Semester",
  //     mp.getSeparuhSemesterPanjangSemester().toString()
  //   );
  //   formData.append(
  //     "Separuh_SemesterPendek_Semester",
  //     mp.getSeparuhSemesterPendekSemester().toString()
  //   );
  //   formData.append(
  //     "Separuh_LatihanIndustri_Semester",
  //     mp.getSeparuhLatihanIndustriSemester().toString()
  //   );
  //   formData.append("mod_penyampaian", mp.getModPenyampaian());
  //   formData.append("struktur_program", mp.getStrukturProgram());
  //   formData.append("program_kerjasama", mp.getProgramKerjasama());
  //   formData.append("jenis_kerjasama", mp.getJenisKerjasama());
  //   formData.append("tarikhSurat", jkpt.getTarikhSurat().toISOString());
  //   formData.append(
  //     "tarikhTerimaSurat",
  //     jkpt.getTarikhTerimaSurat().toISOString()
  //   );
  //   formData.append("tarikhMesyuarat", jkpt.getTarikhMesyuarat().toISOString());
  //   formData.append("sahSehingga", jkpt.getSahSehingga().toISOString());

  return (
    <form method="post" onSubmit={handleSubmitForm}>
      <div className="container mx-auto mt-5 font-sans flex flex-col">
        <h1 className="text-xl  font-bold">PERMOHONAN PROGRAM</h1>
        <BreadcrumbsWithIcon items={breadcrumbs} />

        {/* Maklumat Program */}

        <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl  font-bold text-center mb-5">
            Maklumat Program
          </h2>

          <div className="w-full  space-y-4 ">
            <InputField
              label={"Nama Program"}
              name={"nama_program"}
              placeholder="Sila Masukkan Nama Program"
              // value={namaProgram}
              // onChange={handleInputChange}
              value={namaProgram}
              onChange={(e) => {
                // mp.setNamaProgram(e.target.value);
                // formData.set("nama_program", e.target.value);
                setNamaProgram(e.target.value);
              }}
            />
            <KKMField />
            <DropdownMenu
              label={"Code NEC"}
              options={Nec_Code_List}
              labelId={"code_nec"}
              onChange={(e) => {
                setNec(e.target.value);
                // mp.setCodeNEC(e.target.value);
                // formData.set("code_nec", e.target.value);
              }}
              value={nec}
              // value={mp.getCodeNEC()}
              placeholderOptions={"Sila Pilih Code NEC"}
            />
            <DropdownMenu
              label={"Mod Penawaran"}
              options={mod_penawaran}
              labelId={"mode_penawaran"}
              onChange={(e) => {
                setModPenawaran(e.target.value);
                // mp.setModePenawaran(e.target.value);
                // formData.set("mode_penawaran", e.target.value);
              }}
              value={modPenawaran}
              placeholderOptions={"Sila Pilih Mod Penawaran"}
            />
            <DropdownMenu
              label={"Fakulti"}
              options={fakulti_List}
              labelId={"fakulti"}
              value={fakulti}
              onChange={(e) => {
                setFakulti(e.target.value);
                // mp.setFakulti(e.target.value);
                // formData.set("fakulti", e.target.value);
              }}
              placeholderOptions={"Sila Pilih Fakulti"}
            />
            <JangkaPengajianSepenuhMasa />
            <JangkaPengajianSeparuhMasa />

            <CheckBox />

            <DropdownMenu
              label={"Struktur Program"}
              options={struktur_program}
              labelId={"struktur_program"}
              onChange={(e) => {
                setStruktur(e.target.value);
                // mp.setStrukturProgram(e.target.value);
                // formData.set("struktur_program", e.target.value);
              }}
              value={struktur}
              placeholderOptions={"Sila Pilih Struktur Program"}
            />
            <ProgramKerjasama />

            {/* mesy jkpt */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKPT</h2>

            <DatePicker
              label={"Tarikh Surat"}
              name={"tarikhSurat"}
              onChange={(e) => {
                setTarikhSurat(e.target.value);
                // formData.set("tarikhSurat", e.target.value);
              }}
            />
            <DatePicker
              label={"Tarikh Terima Surat"}
              name={"tarikhTerimaSurat"}
              //   onChange={(e) =>
              //     // formData.set("tarikhTerimaSurat", e.target.value)
              //   }
            />
            <DatePicker
              label={"Tarikh Mesyuarat"}
              name={"tarikhMesyuaratJKPT"}
              //   onChange={(e) => formData.set("tarikhMesyuarat", e.target.value)}
            />

            <TarikhSuratContext.Provider value={tarikhSurat}>
              <TempohSah />
            </TarikhSuratContext.Provider>
            <BilMesyuarat />
            <MuatNaikSurat
              label={"Minit JKPT"}
              name="minitJKPT"
              //   formData={formData}
            />

            {/* Mesy JKA */}

            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <DatePicker
              label={"Tarikh Mesyuarat"}
              name={"tarikhMesyuaratJKA"}
              //   onChange={(e) => formData.set("tarikhMesyuarat", e.target.value)}
            />
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuaratJKA" className="label-input-msa">
                Bil Mesyuarat
              </label>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuaratJKA"
                  name="bilMesyuaratJKA"
                  className="input input-bordered w-1/6"
                  placeholder=" Bil. / Tahun"
                  //   onChange={(e) =>
                  //     // formData.set("bilMesyuaratJKA", e.target.value)
                  //   }
                />
              </div>
            </div>
            <MuatNaikSurat
              label={"Minit JKA"}
              name="minitJKA"
              //   formData={formData}
            />

            <div className="flex space-x-4 justify-end">
              <input
                type="reset"
                value="Reset"
                className="btn btn-error shadow-md text-white"
              />
              <input
                type="submit"
                value="Save"
                className="btn btn-primary shadow-md text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MsaForm_onePage;
