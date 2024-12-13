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
import JangkaPengajian from "./JangkaPengajian";
import ProgramKerjasama from "./ProgramKerjasama";

const MaklumatProgram = () => {
  const [modPenyampaian, setModPenyampaian] = useState("");
  const [nec, setNec] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");

  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <div className="w-full  space-y-4 ">
        <InputField
          label={"Nama Program"}
          name={"nama_program"}
          placeholder="Sila Masukkan Nama Program"
        />
        <KKMField />
        <DropdownMenu
          label={"Code NEC"}
          options={Nec_Code_List}
          labelId={"code_nec"}
          onChange={(e) => {
            setNec(e.target.value);
          }}
          value={nec}
          placeholderOptions={"Sila Pilih Code NEC"}
        />
        <DropdownMenu
          label={"Mod Penawaran"}
          options={mod_penawaran}
          labelId={"mode_penawaran"}
          onChange={(e) => setModPenawaran(e.target.value)}
          value={modPenawaran}
          placeholderOptions={"Sila Pilih Mod Penawaran"}
        />
        <DropdownMenu
          label={"Fakulti"}
          options={fakulti_List}
          labelId={"fakulti"}
          value={fakulti}
          onChange={(e) => setFakulti(e.target.value)}
          placeholderOptions={"Sila Pilih Fakulti"}
        />
        <JangkaPengajian />
        <DropdownMenu
          label={"Mod Penyampaian"}
          options={["Pembelajaran Terbuka", "Jarak Jauh (ODL)"]}
          labelId={"mod_penyampaian"}
          onChange={(e) => setModPenyampaian(e.target.value)}
          value={modPenyampaian}
          placeholderOptions={"Sila Pilih Mod Penyampaian"}
        />
        <DropdownMenu
          label={"Struktur Program"}
          options={struktur_program}
          labelId={"struktur_program"}
          onChange={(e) => setStruktur(e.target.value)}
          value={struktur}
          placeholderOptions={"Sila Pilih Struktur Program"}
        />
        <ProgramKerjasama />

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
  );
};

export default MaklumatProgram;
