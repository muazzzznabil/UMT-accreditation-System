import JangkaPengajianSepenuhMasa from "./JangkaPengajianSepenuhMasa";
import ProgramKerjasama from "./ProgramKerjasama";
import JangkaPengajianSeparuhMasa from "./JangkaPengajianSeparuhMasa";
import CheckBox from "./CheckBox";
import { MaklumatProgramModel } from "../../model/maklumat_program_model";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../../constants/maklumatProgram_constant";
import DropdownMenu from "./DropdownMenu";
import KKMField from "./KKMField";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Program {
  id: number;
  nama_program: string;
  tahapMQF: string;
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
          id
        }
          const response = await axios.put<Program>(
            `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/edit`,
            programUpdated
          );
          if (response.status === 200) {
            alert("Program updated:");
            window.location.href = "/program-list";
          }
          console.table(response.data);
      } catch (error:unknown) {
        console.error(error);

      }
    };
    useEffect(() => {
    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  console.log(`program : ${program.id}` );
  return (
    <form method="POST" onSubmit={updateProgram}>
      <div className="container mt-10 mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
        <div className="w-full space-y-4">
          <InputField
            label={"Nama Program"}
            name={"nama_program"}
            placeholder= {program.nama_program}
            value={program.nama_program}
            onChange={(e) => {
              setProgram({ ...program, nama_program: e.target.value });
            }}
          />
          <KKMField mp={new MaklumatProgramModel()} />
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
          <JangkaPengajianSepenuhMasa mp={new MaklumatProgramModel()} />
          <JangkaPengajianSeparuhMasa mp={new MaklumatProgramModel()} />
          <CheckBox mp={new MaklumatProgramModel()} />
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
          <ProgramKerjasama mp={new MaklumatProgramModel()} />
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

export default UpdateMaklumat;