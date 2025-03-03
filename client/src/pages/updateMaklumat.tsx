/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import KKMUpdate from "../components/msaForm/KKMUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import SepenuhMasa from "../components/msaForm/SepenuhMasa";
import SeparuhMasa from "../components/msaForm/SeparuhMasa";
import KerjasamaUpdate from "../components/msaForm/kerjasamaUpdate";
import DateUpdate from "../components/msaForm/DateUpdate";
import SahLaku from "../components/msaForm/SahSehinggaUpdate";
import dayjs from "dayjs";
import Swal from "sweetalert2";
interface Program {
  MinitJKA: any;
  MinitJKA: any;
  id: number;
  nama_program: string;
  tahapMQF: string;
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
  konvensional: string;
  odl: string;
  konvensional: string;
  odl: string;
  struktur_program: string;
  program_kerjasama: string;
  jenis_kerjasama: string;
  tarikhSurat: Date;
  tarikhTerimaSurat: Date;
  tarikhMesyuarat: Date;
  tarikhSurat: Date;
  tarikhTerimaSurat: Date;
  tarikhMesyuarat: Date;
  tempohSah: string;
  sahSehingga: string;
  bilMesyuarat: string;
  minitJKPT: string;
  tarikMesyJKA: Date;
  tarikMesyJKA: Date;
  bilMesyuaratJKA: string;
  minitJKA: string;
}

const UpdateMaklumat = () => {
  const [program, setProgram] = useState<Program | null>(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [tarikhSurat2, setTarikhSurat2] = useState<Date | null>(null);

  const getProgram = async () => {
    try {
      const response = await axios.get<Program[]>(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}`
      );
      console.table(response.data[0]);
      console.table(response.data[0]);
      setProgram(response.data[0]);
      setTarikhSurat2(response.data[0].tarikhSurat);
      setTarikhSurat2(response.data[0].tarikhSurat);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if ((key === "minitJKPT" || key === "minitJKA") && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // Log the FormData entries for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .put(
        `http://localhost:5000/pendaftaran-program/maklumat-program/${id}/edit2`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.table(response.data);
        Swal.fire({
          title: "Program Updated!",
          text: "Program is successfully Updated!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/program-list";
          }
        });
        // window.location.href = "/program-list";
      })
      .catch((error) => {
        console.table(error.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Program Tidak Berjaya Dikemaskini!",
          footer: "Error" + error,
        });
      });
  };

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.table(data);
  // };

  useEffect(() => {
    getProgram();
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  console.log(`program : ${program.id}`);
  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto mt-5 font-sans flex flex-col">
        <h1 className="text-xl font-bold">UPDATE: {program.nama_program}</h1>
        <h1 className="text-xl font-bold">UPDATE: {program.nama_program}</h1>
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
          <h2 className="text-xl font-bold text-center mb-5">
          <h2 className="text-xl font-bold text-center mb-5">
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
              defaultValue={program.code_nec}
              placeholderOptions={"Sila Pilih Code NEC"}
              register={register}
              register={register}
            />
            <DropdownUpdate
              label={"Mode Penawaran"}
            <DropdownUpdate
              label={"Mode Penawaran"}
              options={mod_penawaran}
              labelId={"mode_penawaran"}
              defaultValue={program.mode_penawaran}
              placeholderOptions={"Sila Pilih Mode Penawaran"}
              register={register}
              defaultValue={program.mode_penawaran}
              placeholderOptions={"Sila Pilih Mode Penawaran"}
              register={register}
            />
            <DropdownUpdate
            <DropdownUpdate
              label={"Fakulti"}
              options={fakulti_List}
              labelId={"fakulti"}
              defaultValue={program.fakulti}
              defaultValue={program.fakulti}
              placeholderOptions={"Sila Pilih Fakulti"}
              register={register}
              register={register}
            />
            <SepenuhMasa
              register={register}
              Sepenuh_max_Tahun={program.Sepenuh_max_Tahun}
              Sepenuh_max_Minggu={program.Sepenuh_max_Minggu}
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
                      defaultChecked={program.konvensional == "true"}
                      className="checkbox mr-2"
                      {...register("konvensional")}
                    />
                    <label htmlFor="konvensional" className=" text-md">
                      Konvensional/Terbuka
                    </label>
                  </div>
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="ODL"
                      defaultChecked={program.odl === "true"}
                      className="checkbox mr-2"
                      {...register("ODL")}
                    />
                    <label htmlFor="ODL" className=" text-md">
                      Jarak Jauh (ODL)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DropdownUpdate
            <SepenuhMasa
              register={register}
              Sepenuh_max_Tahun={program.Sepenuh_max_Tahun}
              Sepenuh_max_Minggu={program.Sepenuh_max_Minggu}
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
                      defaultChecked={program.konvensional == "true"}
                      className="checkbox mr-2"
                      {...register("konvensional")}
                    />
                    <label htmlFor="konvensional" className=" text-md">
                      Konvensional/Terbuka
                    </label>
                  </div>
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="ODL"
                      defaultChecked={program.odl === "true"}
                      className="checkbox mr-2"
                      {...register("ODL")}
                    />
                    <label htmlFor="ODL" className=" text-md">
                      Jarak Jauh (ODL)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DropdownUpdate
              label={"Struktur Program"}
              options={struktur_program}
              labelId={"struktur_program"}
              defaultValue={program.struktur_program}
              defaultValue={program.struktur_program}
              placeholderOptions={"Sila Pilih Struktur Program"}
              register={register}
              register={register}
            />
            <KerjasamaUpdate
              register={register}
              programKerjasama={program.program_kerjasama}
              jenisKerjasama={program.jenis_kerjasama}
            />
            {/* mesy jkpt */}
            <KerjasamaUpdate
              register={register}
              programKerjasama={program.program_kerjasama}
              jenisKerjasama={program.jenis_kerjasama}
            />
            {/* mesy jkpt */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKPT</h2>
            <DateUpdate
              name="tarikhSurat"
              label="Tarikh Surat"
              defValue={program.tarikhSurat}
              register={register}
              onChange={(e) => setTarikhSurat2(dayjs(e.target.value).toDate())}
            />
            <DateUpdate
              name="tarikhTerimaSurat"
              label="Tarikh Terima Surat"
              defValue={program.tarikhTerimaSurat}
              register={register}
            <DateUpdate
              name="tarikhSurat"
              label="Tarikh Surat"
              defValue={program.tarikhSurat}
              register={register}
              onChange={(e) => setTarikhSurat2(dayjs(e.target.value).toDate())}
            />
            <DateUpdate
              name="tarikhTerimaSurat"
              label="Tarikh Terima Surat"
              defValue={program.tarikhTerimaSurat}
              register={register}
            />
            <DateUpdate
              name="tarikhMesyuarat"
              label="Tarikh Mesyuarat"
              defValue={program.tarikhMesyuarat}
              register={register}
            />
            <SahLaku
              register={register}
              defValueTahun={parseInt(program.tempohSah)}
              // defValueSahSehingga={new Date(program.sahSehingga)}
              tarikhSurat={dayjs(tarikhSurat2).toDate()}
              setValue={setValue}
            />
            {/* Bil Mesyuarat */}
            <DateUpdate
              name="tarikhMesyuarat"
              label="Tarikh Mesyuarat"
              defValue={program.tarikhMesyuarat}
              register={register}
            />
            <SahLaku
              register={register}
              defValueTahun={parseInt(program.tempohSah)}
              // defValueSahSehingga={new Date(program.sahSehingga)}
              tarikhSurat={dayjs(tarikhSurat2).toDate()}
              setValue={setValue}
            />
            {/* Bil Mesyuarat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuarat" className="label-input-msa">
                Bil Mesyuarat JKPT
              <label htmlFor="bilMesyuarat" className="label-input-msa">
                Bil Mesyuarat JKPT
              </label>
              <div className="w-full flex items-center ">
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuarat"
                  type="text"
                  id="bilMesyuarat"
                  required
                  defaultValue={program.bilMesyuarat}
                  {...register("bilMesyuarat", {
                    pattern: /^[0-9]+\/[0-9]{4}$/,
                  })}
                  className="input input-bordered w-1/6"
                  placeholder=" Bil. / Tahun"
                />
                {errors.bilMesyuarat &&
                  errors.bilMesyuarat.type === "pattern" && (
                    <p className="text-red-500 text-md mt-1 ml-4">
                      Format haruslah seperti :{" "}
                      <span className="font-semibold">" Bil./Tahun "</span>
                    </p>
                  )}
                  defaultValue={program.bilMesyuarat}
                  {...register("bilMesyuarat", {
                    pattern: /^[0-9]+\/[0-9]{4}$/,
                  })}
                  className="input input-bordered w-1/6"
                  placeholder=" Bil. / Tahun"
                />
                {errors.bilMesyuarat &&
                  errors.bilMesyuarat.type === "pattern" && (
                    <p className="text-red-500 text-md mt-1 ml-4">
                      Format haruslah seperti :{" "}
                      <span className="font-semibold">" Bil./Tahun "</span>
                    </p>
                  )}
              </div>
            </div>
            {/* Bil Mesyuarat */}
            {/* Muat Naik Surat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="name" className="label-input-msa">
                Minit JKPT
              </label>
              <div className="w-full flex items-center">
                <input
                  type="file"
                  id="minitJKPT"
                  {...register("minitJKPT")}
                  className="file-input file-input-bordered w-1/2"
                />
                <a
                  href={`http://localhost:5000${program.minitJKPT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline ml-4"
                >
                  {program.minitJKPT.split("/").pop()}
                </a>
              </div>
            </div>{" "}
            <input
              type="hidden"
              {...register("existingMinitJKPT")}
              value={program.minitJKPT}
            />
            {/* Muat Naik Surat */}
            {/* Mesyuarat JKA */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <DateUpdate
              name="tarikMesyJKA"
              label="Tarikh Mesyuarat JKA"
              defValue={program.tarikMesyJKA}
              register={register}
            />
            {/* Bil Mesyuarat */}
            {/* Bil Mesyuarat */}
            {/* Muat Naik Surat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="name" className="label-input-msa">
                Minit JKPT
              </label>
              <div className="w-full flex items-center">
                <input
                  type="file"
                  id="minitJKPT"
                  {...register("minitJKPT")}
                  className="file-input file-input-bordered w-1/2"
                />
                <a
                  href={`http://localhost:5000${program.minitJKPT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline ml-4"
                >
                  {program.minitJKPT.split("/").pop()}
                </a>
              </div>
            </div>{" "}
            <input
              type="hidden"
              {...register("existingMinitJKPT")}
              value={program.minitJKPT}
            />
            {/* Muat Naik Surat */}
            {/* Mesyuarat JKA */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <DateUpdate
              name="tarikMesyJKA"
              label="Tarikh Mesyuarat JKA"
              defValue={program.tarikMesyJKA}
              register={register}
            />
            {/* Bil Mesyuarat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuaratJKA" className="label-input-msa">
                Bil Mesyuarat JKA
                Bil Mesyuarat JKA
              </label>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuaratJKA"
                  required
                  defaultValue={program.bilMesyuaratJKA}
                  {...register("bilMesyuaratJKA", {
                    pattern: /^[0-9]+\/[0-9]{4}$/,
                  })}
                  required
                  defaultValue={program.bilMesyuaratJKA}
                  {...register("bilMesyuaratJKA", {
                    pattern: /^[0-9]+\/[0-9]{4}$/,
                  })}
                  className="input input-bordered w-1/6"
                  placeholder=" Bil. / Tahun"
                />
                {errors.bilMesyuaratJKA &&
                  errors.bilMesyuaratJKA.type === "pattern" && (
                    <p className="text-red-500 text-md mt-1 ml-4">
                      Format haruslah seperti :{" "}
                      <span className="font-semibold">" Bil./Tahun "</span>
                    </p>
                  )}
                />
                {errors.bilMesyuaratJKA &&
                  errors.bilMesyuaratJKA.type === "pattern" && (
                    <p className="text-red-500 text-md mt-1 ml-4">
                      Format haruslah seperti :{" "}
                      <span className="font-semibold">" Bil./Tahun "</span>
                    </p>
                  )}
              </div>
            </div>
            {/* Bil Mesyuarat */}
            {/* Muat Naik Surat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="name" className="label-input-msa">
                Minit JKA
              </label>
              <div className="w-full flex items-center">
                <input
                  type="file"
                  id="minitJKA"
                  {...register("minitJKA")}
                  className="file-input file-input-bordered w-1/2"
                />
                <a
                  href={`http://localhost:5000${program.MinitJKA}`}
                  className="text-blue-500 underline ml-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {program.MinitJKA.split("/").pop()}
                </a>
              </div>
            </div>{" "}
            <input
              type="hidden"
              {...register("existingMinitJKA")}
              value={program.MinitJKA}
            {/* Bil Mesyuarat */}
            {/* Muat Naik Surat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="name" className="label-input-msa">
                Minit JKA
              </label>
              <div className="w-full flex items-center">
                <input
                  type="file"
                  id="minitJKA"
                  {...register("minitJKA")}
                  className="file-input file-input-bordered w-1/2"
                />
                <a
                  href={`http://localhost:5000${program.MinitJKA}`}
                  className="text-blue-500 underline ml-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {program.MinitJKA.split("/").pop()}
                </a>
              </div>
            </div>{" "}
            <input
              type="hidden"
              {...register("existingMinitJKA")}
              value={program.MinitJKA}
            />
            <div className="flex space-x-4 justify-end">
              <input
                type="reset"
                value="Batal"
                className="btn btn-error shadow-md text-white"
              />
              <button
              <button
                type="submit"
                className="btn btn-primary shadow-md text-white"
                onClick={(e) => {
                  e.preventDefault();

                  Swal.fire({
                    title: "Adekah anda pasti untuk kemaskini?",
                    showDenyButton: true,
                    confirmButtonText: "Kemaskini",
                    denyButtonText: `Batal`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit(onSubmit)();
                    } else if (result.isDenied) {
                      Swal.fire("Kemaskini tidak berjaya", "", "info");
                    }
                  });
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateMaklumat;
