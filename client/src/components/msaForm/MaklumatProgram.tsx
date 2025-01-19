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
  formData: FormData;
}

const MaklumatProgram: React.FC<Props> = ({ formData }) => {
  const [namaProgram, setNamaProgram] = useState("");
  const [nec, setNec] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");

  // useEffect(() => {
  //   setNamaProgram(mp.getNamaProgram());
  // }, [mp]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = e.target.value;
  //   setNamaProgram(newValue);
  //   mp.setNamaProgram(newValue);
  // };
  return (
    // <form onSubmit={postMaklumatProgram} method="POST">
    <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
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
            formData.append("nama_program", e.target.value);
            setNamaProgram(e.target.value);
          }}
        />
        <KKMField formData={formData} />
        <DropdownMenu
          label={"Code NEC"}
          options={Nec_Code_List}
          labelId={"code_nec"}
          onChange={(e) => {
            setNec(e.target.value);
            // mp.setCodeNEC(e.target.value);
            formData.append("code_nec", e.target.value);
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
            formData.append("mode_penawaran", e.target.value);
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
            formData.append("fakulti", e.target.value);
          }}
          placeholderOptions={"Sila Pilih Fakulti"}
        />
        <JangkaPengajianSepenuhMasa formData={formData} />
        <JangkaPengajianSeparuhMasa formData={formData} />

        <CheckBox formData={formData} />

        <DropdownMenu
          label={"Struktur Program"}
          options={struktur_program}
          labelId={"struktur_program"}
          onChange={(e) => {
            setStruktur(e.target.value);
            // mp.setStrukturProgram(e.target.value);
            formData.append("struktur_program", e.target.value);
          }}
          value={struktur}
          placeholderOptions={"Sila Pilih Struktur Program"}
        />
        <ProgramKerjasama formData={formData} />

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
