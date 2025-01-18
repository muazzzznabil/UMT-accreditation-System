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
// import axios from "axios";

interface Props {
  mp: MaklumatProgramModel;
}

const MaklumatProgram: React.FC<Props> = ({ mp }) => {
  const [namaProgram, setNamaProgram] = useState("");
  const [nec, setNec] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");

  return (
    // <form onSubmit={postMaklumatProgram} method="POST">
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
      <div className="w-full  space-y-4 ">
        <InputField
          label={"Nama Program"}
          name={"nama_program"}
          placeholder="Sila Masukkan Nama Program"
          value={namaProgram}
          onChange={(e) => {
            setNamaProgram(e.target.value);
            mp.setNamaProgram(e.target.value);
          }}
        />
        <KKMField mp={mp} />
        <DropdownMenu
          label={"Code NEC"}
          options={Nec_Code_List}
          labelId={"code_nec"}
          onChange={(e) => {
            setNec(e.target.value);
            mp.setCodeNEC(e.target.value);
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
            mp.setModePenawaran(e.target.value);
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
            mp.setFakulti(e.target.value);
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
            mp.setStrukturProgram(e.target.value);
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
    // </form>
  );
};

export default MaklumatProgram;
