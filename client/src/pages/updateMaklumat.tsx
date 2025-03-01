import { useEffect, useState } from "react";
import {
  fakulti_List,
  mod_penawaran,
  // fakulti_List,
  Nec_Code_List,
  // Nec_Code_List,
  // struktur_program,
} from "../constants/maklumatProgram_constant";
// import DropdownMenu from "../components/msaForm/DropdownMenu";
// import KKMField from "../components/msaForm/KKMField";
import axios from "axios";
import { useParams } from "react-router-dom";
import KKMUpdate from "../components/msaForm/KKMUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import SepenuhMasa from "../components/msaForm/SepenuhMasa";
import SeparuhMasa from "../components/msaForm/SeparuhMasa";

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
  const { register, handleSubmit } = useForm();

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

  // const onSubmit: SubmitHandler<Program> = async (data) => {
  //   axios
  //     .put(
  //       `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/edit2`,
  //       data,
  //       { headers: { "Content-Type": "application/json" } }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("Program updated:");
  //       window.location.href = "/program-list";
  //     })
  //     .catch((error) => {
  //       console.log(error.data);
  //       alert("Program not updated:");
  //     });
  // };

  const onSubmit: SubmitHandler<Program> = (data) => console.log(data);

  useEffect(() => {
    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  console.log(`program : ${program.id}`);
  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex mb-4 items-center">
              <label htmlFor="nama_program" className="label-input-msa">
                Nama Program
              </label>
              <input
                id="nama_program"
                defaultValue={program.nama_program}
                placeholder={program.nama_program}
                required
                className="input input-bordered w-full"
                {...register("nama_program")}
              />
            </div>
            <KKMUpdate
              valueMQF={program.tahapMQF}
              valueSektorAkademik={program.sektorAkademik}
              register={register}
            />
            <DropdownUpdate
              label={"Code NEC"}
              options={Nec_Code_List}
              labelId={"code_nec"}
              defaultValue={program.code_nec}
              placeholderOptions={"Sila Pilih Code NEC"}
              register={register}
            />
            <DropdownUpdate
              label={"Mode Penawaran"}
              options={mod_penawaran}
              labelId={"mode_penawaran"}
              defaultValue={program.mode_penawaran}
              placeholderOptions={"Sila Pilih Mode Penawaran"}
              register={register}
            />
            <DropdownUpdate
              label={"Fakulti"}
              options={fakulti_List}
              labelId={"fakulti"}
              defaultValue={program.fakulti}
              placeholderOptions={"Sila Pilih Fakulti"}
              register={register}
            />
            <SepenuhMasa
              register={register}
              Sepenuh_max_Tahun={parseInt(program.Sepenuh_max_Tahun)}
              Sepenuh_max_Minggu={parseInt(program.Sepenuh_max_Minggu)}
              Sepenuh_max_Semester={program.Sepenuh_max_Semester}
              Sepenuh_min_Tahun={program.Sepenuh_min_Tahun}
              Sepenuh_min_Minggu={program.Sepenuh_min_Minggu}
              Sepenuh_min_Semester={program.Sepenuh_min_Semester}
              Sepenuh_SemesterPanjang_Semester={
                program.Sepenuh_SemesterPanjang_Semester
              }
              Sepenuh_SemesterPendek_Semester={
                program.Sepenuh_SemesterPendek_Semester
              }
              Sepenuh_LatihanIndustri_Semester={
                program.Sepenuh_LatihanIndustri_Semester
              }
            />
            <SeparuhMasa
              register={register}
              separuh_max_Tahun={parseInt(program.Separuh_max_Tahun)}
              separuh_max_Minggu={parseInt(program.Separuh_max_Minggu)}
              separuh_max_Semester={program.Separuh_max_Semester}
              separuh_min_Tahun={program.Separuh_min_Tahun}
              separuh_min_Minggu={program.Separuh_min_Minggu}
              separuh_min_Semester={program.Separuh_min_Semester}
              separuh_SemesterPanjang_Semester={
                program.Separuh_SemesterPanjang_Semester
              }
              separuh_SemesterPendek_Semester={
                program.Separuh_SemesterPendek_Semester
              }
              separuh_LatihanIndustri_Semester={
                program.Separuh_LatihanIndustri_Semester
              }
            />

            <div className="flex w-full items-center">
              <label htmlFor="mod_penyampaian" className="label-input-msa">
                Mod Penyampaian
              </label>
              <div className="w-full flex justify-between">
                <div className="flex items-start ">
                  <div className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="konvensional"
                      value={"Konvensional/Terbuka"}
                      className="checkbox  mr-2"
                      {...register("konvensional")}
                      // onChange={handleModPenyampaianChange}
                    />
                    <label htmlFor="konvensional" className=" text-md">
                      Konvensional/Terbuka
                    </label>
                  </div>
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={"Jarak Jauh (ODL)"}
                      id="ODL"
                      {...register("ODL")}
                      className="checkbox  mr-2"
                      // onChange={handleModPenyampaianChange}
                    />
                    <label htmlFor="ODL" className=" text-md">
                      Jarak Jauh (ODL)
                    </label>
                  </div>
                </div>
              </div>
            </div>

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
