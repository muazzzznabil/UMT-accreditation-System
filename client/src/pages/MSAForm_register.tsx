<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
=======
>>>>>>> origin/main
import { SubmitHandler, useForm } from "react-hook-form";
import KKMUpdate from "../components/msaForm/KKMUpdate";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import SepenuhMasa from "../components/msaForm/SepenuhMasa";
import SeparuhMasa from "../components/msaForm/SeparuhMasa";
import KerjasamaUpdate from "../components/msaForm/kerjasamaUpdate";
import DateUpdate from "../components/msaForm/DateUpdate";
import SahLaku from "../components/msaForm/SahSehinggaUpdate";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import Swal from "sweetalert2";
=======
>>>>>>> origin/main

const MSAForm_register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [tarikhSurat2, setTarikhSurat2] = useState<Date>(new Date());

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if ((key === "minitJKPT" || key === "minitJKA") && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(
        `http://localhost:5000/pendaftaran-program/maklumat-program`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.table(response.data);
<<<<<<< HEAD
        Swal.fire({
          title: "Program Registered!",
          text: "Program is successfully registered!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/program-list";
          }
        });
      })
      .catch((error) => {
        console.table(error.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Program Tidak Berjaya Didaftarkan!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      });
  };

  //   const onSubmit: SubmitHandler<any> = async (data) => {
  //     console.table(data);
  //   };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto mt-5 font-sans flex flex-col">
        <h1 className="text-xl  font-bold">PERMOHONAN PROGRAM</h1>
        <div className="breadcrumbs text-md mb-2">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>Daftar Program Baru</li>
          </ul>
        </div>
        <div className="container mt-10 mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
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
                // defaultValue={program.nama_program}
                placeholder="Sila Masukkan Nama Program"
                required
                className="input input-bordered w-full"
                {...register("nama_program")}
              />
            </div>
            <KKMUpdate
              //   valueMQF={program.tahapMQF}
              //   valueSektorAkademik={program.sektorAkademik}
              register={register}
            />
            <DropdownUpdate
              label={"Code NEC"}
              options={Nec_Code_List}
              labelId={"code_nec"}
              defaultValue={"placeholder"}
              placeholderOptions={"Sila Pilih Code NEC"}
              register={register}
            />
            <DropdownUpdate
              label={"Mode Penawaran"}
              options={mod_penawaran}
              labelId={"mode_penawaran"}
              defaultValue={"placeholder"}
              placeholderOptions={"Sila Pilih Mode Penawaran"}
              register={register}
            />
            <DropdownUpdate
              label={"Fakulti"}
              options={fakulti_List}
              labelId={"fakulti"}
              defaultValue={"placeholder"}
              placeholderOptions={"Sila Pilih Fakulti"}
              register={register}
            />
            <SepenuhMasa
              register={register}
              Sepenuh_LatihanIndustri_Semester={"placeholder"}
              Sepenuh_SemesterPendek_Semester="placeholder"
              Sepenuh_SemesterPanjang_Semester="placeholder"
              Sepenuh_min_Minggu="placeholder"
              Sepenuh_min_Semester="placeholder"
              Sepenuh_min_Tahun="placeholder"
              Sepenuh_max_Minggu="placeholder"
              Sepenuh_max_Semester="placeholder"
              Sepenuh_max_Tahun="placeholder"
            />
            <SeparuhMasa register={register} />
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
                      {...register("konvensional")}
                      className="checkbox  mr-2"
                      onChange={(e) => setValue("konvensional", e.target.value)}
                    />
                    <label htmlFor="konvensional" className=" text-md">
                      Konvensional/Terbuka
                    </label>
                  </div>
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="ODL"
                      {...register("ODL")}
                      className="checkbox  mr-2"
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
              defaultValue={"placeholder"}
              placeholderOptions={"Sila Pilih Struktur Program"}
              register={register}
            />
            <KerjasamaUpdate
              register={register}
              programKerjasama="placeholder"
              jenisKerjasama="placeholder"
            />
            {/* mesy jkpt */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKPT</h2>
            <DateUpdate
              name="tarikhSurat"
              label="Tarikh Surat"
              placeholder="Tarikh Surat"
              register={register}
              onChange={(e) => setTarikhSurat2(dayjs(e.target.value).toDate())}
            />
            <DateUpdate
              name="tarikhTerimaSurat"
              label="Tarikh Terima Surat"
              register={register}
              placeholder="Tarikh Terima Surat"
            />
            <DateUpdate
              name="tarikhMesyuarat"
              label="Tarikh Mesyuarat"
              placeholder="Tarikh Mesyuarat"
              register={register}
            />
            <SahLaku
              register={register}
              setValue={setValue}
              tarikhSurat={dayjs(tarikhSurat2).toDate()}
            />
            {/* Bil Mesyuarat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuarat" className="label-input-msa">
                Bil Mesyuarat JKPT
              </label>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuarat"
                  required
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
              </div>
            </div>{" "}
            {/* Muat Naik Surat */}
            {/* Mesyuarat JKA */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <DateUpdate
              name="tarikMesyJKA"
              label="Tarikh Mesyuarat JKA"
              register={register}
            />
            {/* Bil Mesyuarat */}
            <div className="flex mb-4 items-center">
              <label htmlFor="bilMesyuaratJKA" className="label-input-msa">
                Bil Mesyuarat JKA
              </label>
              <div className="w-full flex items-center ">
                <input
                  type="text"
                  id="bilMesyuaratJKA"
                  required
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
              </div>
            </div>{" "}
            <div className="flex space-x-4 justify-end">
              <input
                type="reset"
                value="Reset"
                className="btn btn-error shadow-md text-white"
              />
              <button
                type="submit"
                className="btn btn-primary shadow-md text-white"
                onClick={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    title: "Simpan Permohonan Program?",
                    showDenyButton: true,
                    confirmButtonText: "Simpan",
                    denyButtonText: `Batal`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit(onSubmit)();
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MSAForm_register;
