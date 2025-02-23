import JangkaPengajianSepenuhMasa from "../components/msaForm/JangkaPengajianSepenuhMasa";
import ProgramKerjasama from "../components/msaForm/ProgramKerjasama";
import JangkaPengajianSeparuhMasa from "../components/msaForm/JangkaPengajianSeparuhMasa";
import CheckBox from "../components/msaForm/CheckBox";
// import { MaklumatProgramModel } from "../model/maklumat_program_model";
import { useEffect, useState } from "react";
import InputField from "../components/msaForm/InputField";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import DropdownMenu from "../components/msaForm/DropdownMenu";
import KKMField from "../components/msaForm/KKMField";
import axios from "axios";
import { useParams } from "react-router-dom";
import DatePicker from "../components/msaForm/DatePicker";
// import { TarikhSuratContext } from "../components/msaForm/MesyJPKT";
// import TempohSah from "../components/msaForm/TempohSah";
import BilMesyuarat from "../components/msaForm/BilMesyuarat";
import MuatNaikSurat from "../components/msaForm/MuatNaikSurat";

interface Program {
  id: number;
  nama_program: string;
  tahapKKM: string;
  sektorAkademik: string;
  code_nec: string;
  mode_penawaran: string;
  fakulti: string;
  Sepenuh_max_Tahun: string;
  Sepenuh_max_Minggu: string;
  Sepenuh_max_Semester: string;
  Sepenuh_min_Tahun: string;
  Sepenuh_min_Minggu: string;
  Sepenuh_min_Semester: string;
  Sepenuh_SemesterPanjang_Semester: string;
  Sepenuh_SemesterPendek_Semester: string;
  Sepenuh_LatihanIndustri_Semester: string;
  Separuh_max_Tahun: string;
  Separuh_max_Minggu: string;
  Separuh_max_Semester: string;
  Separuh_min_Tahun: string;
  Separuh_min_Minggu: string;
  Separuh_min_Semester: string;
  Separuh_SemesterPanjang_Semester: string;
  Separuh_SemesterPendek_Semester: string;
  Separuh_LatihanIndustri_Semester: string;
  mod_penyampaian: string[];
  struktur_program: string;
  program_kerjasama: string;
  jenis_kerjasama: string;
  tarikhSurat: string;
  tarikhTerimaSurat: string;
  tarikhMesyuarat: string;
  tempohSah: string;
  sahSehingga: string;
  bilMesyuarat: string;
  minitJKPT: string;
  tarikhMesyuaratJKA: string;
  bilMesyuaratJKA: string;
  minitJKA: string;
}

const UpdateMaklumat = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const { id } = useParams();

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}`
      );
      console.table(response.data);
      setProgram(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const programUpdated = {
        ...program,
        id,
      };
      const response = await axios.put<Program>(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/edit`,
        programUpdated
      );
      if (response.status === 200) {
        alert("Program updated:");
        window.location.href = "/program-list";
      }
      console.table(response.data);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  console.log(`program : ${program.id}`);
  return (
    <form method="POST" onSubmit={updateProgram}>
      <div className="container mx-auto mt-5 font-sans flex flex-col">
        <h1 className="text-xl  font-bold">UPDATE: {program.nama_program}</h1>
        <div className="breadcrumbs text-md mb-2">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/program-list">Program List For MSA Application</a>
            </li>
            <li>Update : {program.nama_program}</li>
          </ul>
        </div>
        <div className="container mt-10 mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl  font-bold text-center mb-5">
            Maklumat Program
          </h2>
          <div className="w-full space-y-4">
            <InputField
              label={"Nama Program"}
              name={"nama_program"}
              placeholder={program.nama_program}
              value={program.nama_program}
              onChange={(e) => {
                setProgram({ ...program, nama_program: e.target.value });
              }}
            />
            <KKMField valueSektorAkademik="{program.sektorAkademik}" />
            <DropdownMenu
              label={"Code NEC"}
              options={Nec_Code_List}
              labelId={"code_nec"}
              onChange={(e) => {
                setProgram({ ...program, code_nec: e.target.value });
              }}
              value={program.code_nec}
              placeholderOptions={"Sila Pilih Code NEC"}
            />
            <DropdownMenu
              label={"Mod Penawaran"}
              options={mod_penawaran}
              labelId={"mode_penawaran"}
              onChange={(e) => {
                setProgram({ ...program, mode_penawaran: e.target.value });
              }}
              value={program.mode_penawaran}
              placeholderOptions={"Sila Pilih Mod Penawaran"}
            />
            <DropdownMenu
              label={"Fakulti"}
              options={fakulti_List}
              labelId={"fakulti"}
              value={program.fakulti}
              onChange={(e) => {
                setProgram({ ...program, fakulti: e.target.value });
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
                setProgram({ ...program, struktur_program: e.target.value });
              }}
              value={program.struktur_program}
              placeholderOptions={"Sila Pilih Struktur Program"}
            />
            <ProgramKerjasama />

            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKPT</h2>

            {/* <DatePicker
              label={"Tarikh Surat"}
              name={"tarikhSurat"}
              onChange={(e) => {
                setTarikhSurat(e.target.value);
              }}
            /> */}
            <DatePicker
              label={"Tarikh Terima Surat"}
              // dateValue={program.tarikhTerimaSurat}
              name={"tarikhTerimaSurat"}
            />
            <DatePicker
              label={"Tarikh Mesyuarat"}
              name={"tarikhMesyuaratJKPT"}
            />

            {/* <TarikhSuratContext.Provider value={tarikhSurat}>
              <TempohSah />
            </TarikhSuratContext.Provider> */}
            <BilMesyuarat bilMesyuarat={program.bilMesyuarat} />
            <MuatNaikSurat label={"Minit JKPT"} name="minitJKPT" />

            {/* Mesy JKA */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <div className="flex mb-4 items-center">
              <label htmlFor="tarikhMesyuaratJKA" className="label-input-msa">
                Tarikh Mesyuarat JKA
              </label>
              <div className="w-full">
                <input
                  type="date"
                  required
                  id="tarikhMesyuaratJKA"
                  name="tarikhMesyuaratJKA"
                  // value={
                  //   new Date(program.tarikhMesyuaratJKA)
                  //     .toISOString()
                  //     .split("T")[0]
                  // }
                  className="p-2 h-12 rounded-lg border w-full"
                />
              </div>
            </div>
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuaratJKA" className="label-input-msa">
                Bil Mesyuarat
              </label>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuaratJKA"
                  name="bilMesyuaratJKA"
                  value={program.bilMesyuaratJKA}
                  className="input input-bordered w-1/6"
                  placeholder=" Bil. / Tahun"
                  required
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

export default UpdateMaklumat;
