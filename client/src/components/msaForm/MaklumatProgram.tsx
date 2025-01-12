import React, { useState } from "react";
import InputField from "./InputField";
import DropdownMenu from "./DropdownMenu";
import KKMField from "./KKMField";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../../constants/maklumatProgram_constant";
import JangkaPengajianSepenuhMasa from "./JangkaPengajianSepenuhMasa";
import ProgramKerjasama from "./ProgramKerjasama";
import JangkaPengajianSeparuhMasa from "./JangkaPengajianSeparuhMasa";
import CheckBox from "./CheckBox";
import { MaklumatProgramModel } from "../../model/maklumat_program_model";
import axios from "axios";

const MaklumatProgram = () => {
  const [namaProgram, setNamaProgram] = useState("");
  const [nec, setNec] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");
  const [mp] = useState(new MaklumatProgramModel());
  // const mp = new MaklumatProgramModel();

  const maklumatData = {
    nama_program: namaProgram,
    tahapMQF: mp.getTahapMQF(),
    sektorAkademik: mp.getSektorAkademik(),
    code_nec: nec,
    mode_penawaran: modPenawaran,
    fakulti: fakulti,
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
    struktur_program: struktur,
    program_kerjasama: mp.getProgramKerjasama(),
    jenis_kerjasama: mp.getJenisKerjasama(),
  };
  const postMaklumatProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table(maklumatData);
    const response = await axios.post(
      "http://localhost:5000/pendaftaran-program/maklumat-program",
      maklumatData
    );
    if (response.status === 200) {
      alert("Data Berjaya Disimpan");
      window.location.href = "/program-list";
    } else {
      alert("Data Gagal Disimpan");
    }
  };
  return (
    <form onSubmit={postMaklumatProgram} method="POST">
      <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
        <div className="w-full  space-y-4 ">
          <InputField
            label={"Nama Program"}
            name={"nama_program"}
            placeholder="Sila Masukkan Nama Program"
            value={namaProgram}
            onChange={(e) => {
              setNamaProgram(e.target.value);
            }}
          />
          <KKMField mp={mp} />
          <DropdownMenu
            label={"Code NEC"}
            options={Nec_Code_List}
            labelId={"code_nec"}
            onChange={(e) => {
              setNec(e.target.value);
              // handleInputChange(e);
            }}
            value={nec}
            placeholderOptions={"Sila Pilih Code NEC"}
          />
          <DropdownMenu
            label={"Mod Penawaran"}
            options={mod_penawaran}
            labelId={"mode_penawaran"}
            onChange={(e) => {
              setModPenawaran(e.target.value);
              // handleInputChange(e);
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
              // handleInputChange(e);
            }}
            placeholderOptions={"Sila Pilih Fakulti"}
          />
          <JangkaPengajianSepenuhMasa mp={mp} />
          <JangkaPengajianSeparuhMasa mp={mp} />

          <CheckBox mp={mp} />

          <DropdownMenu
            label={"Struktur Program"}
            options={struktur_program}
            labelId={"struktur_program"}
            onChange={(e) => {
              setStruktur(e.target.value);
              // handleInputChange(e);
            }}
            value={struktur}
            placeholderOptions={"Sila Pilih Struktur Program"}
          />
          <ProgramKerjasama mp={mp} />

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
    </form>
  );
};

export default MaklumatProgram;
