import React from "react";
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
  return (
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <form className="w-full  space-y-4 ">
        <InputField
          label={"Nama Program"}
          name={"namaProgram"}
          placeholder="Sila Masukkan Nama Program"
        />
        <KKMField />
        <DropdownMenu
          label={"Code NEC"}
          options={Nec_Code_List || []}
          labelId={"code-nec"}
          placeholderOptions={"Sila Pilih Code NEC"}
        />
        <DropdownMenu
          label={"Mod Penawaran"}
          options={mod_penawaran || []}
          labelId={"mod-penawaran"}
          placeholderOptions={"Sila Pilih Mod Penawaran"}
        />
        <DropdownMenu
          label={"Fakulti"}
          options={fakulti_List || []}
          labelId={"fakulti"}
          placeholderOptions={"Sila Pilih Fakulti"}
        />
        <JangkaPengajian />
        <DropdownMenu
          label={"Mod Penyampaian"}
          options={["Pembelajaran Terbuka", "Jarak Jauh (ODL)"]}
          labelId={"mod-penyampaian"}
          placeholderOptions={"Sila Pilih Mod Penyampaian"}
        />
        <DropdownMenu
          label={"Struktur Program"}
          options={struktur_program || []}
          labelId={"struktur-program"}
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
      </form>
    </div>
  );
};

export default MaklumatProgram;
