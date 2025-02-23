import BreadcrumbsWithIcon from "../components/BreadCrumbs";
import { useBreadcrumbs } from "../utils/getBreadcrumbs";
import InputField from "../components/msaForm/InputField";
import React, { useState } from "react";
import {
  fakulti_List,
  mod_penawaran,
  Nec_Code_List,
  struktur_program,
} from "../constants/maklumatProgram_constant";
import KKMField from "../components/msaForm/KKMField";
import DropdownMenu from "../components/msaForm/DropdownMenu";
import JangkaPengajianSeparuhMasa from "../components/msaForm/JangkaPengajianSeparuhMasa";
import JangkaPengajianSepenuhMasa from "../components/msaForm/JangkaPengajianSepenuhMasa";
// import CheckBox from "../components/msaForm/CheckBox";
import ProgramKerjasama from "../components/msaForm/ProgramKerjasama";
import DatePicker from "../components/msaForm/DatePicker";
import { TarikhSuratContext } from "../components/msaForm/MesyJPKT";
import TempohSah from "../components/msaForm/TempohSah";
import BilMesyuarat from "../components/msaForm/BilMesyuarat";
import MuatNaikSurat from "../components/msaForm/MuatNaikSurat";
import axios from "axios";

const MsaForm_onePage = () => {
  const breadcrumbs = useBreadcrumbs();
  const [namaProgram, setNamaProgram] = useState("");
  const [nec, setNec] = useState("");
  const [modPenawaran, setModPenawaran] = useState("");
  const [fakulti, setFakulti] = useState("");
  const [struktur, setStruktur] = useState("");
  const [tarikhSurat, setTarikhSurat] = useState("");
  const [modPenyampaian, setModPenyampaian] = useState<string[]>([]);

  const handleModPenyampaianChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setModPenyampaian((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  const handleSubmitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("mod_penyampaian", modPenyampaian.join(" , "));

    for (const [key, value] of formData.entries()) {
      console.table(`${key}: ${value}`);
    }
    const response = await axios.post(
      "http://localhost:5000/pendaftaran-program/maklumat-program",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      alert("Data Berjaya Disimpan");
      window.location.href = "/program-list";
    } else {
      alert("Data Gagal Disimpan");
    }
  };

  return (
    <form method="post" onSubmit={handleSubmitForm}>
      <div className="container mx-auto mt-5 font-sans flex flex-col">
        <h1 className="text-xl  font-bold">PERMOHONAN PROGRAM</h1>
        <BreadcrumbsWithIcon items={breadcrumbs} />

        {/* Maklumat Program */}

        <div className="container mb-32 mx-auto flex flex-col bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl  font-bold text-center mb-5">
            Maklumat Program
          </h2>

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
                // formData.set("nama_program", e.target.value);
                setNamaProgram(e.target.value);
              }}
            />
            <KKMField />
            <DropdownMenu
              label={"Code NEC"}
              options={Nec_Code_List}
              labelId={"code_nec"}
              onChange={(e) => {
                setNec(e.target.value);
                // mp.setCodeNEC(e.target.value);
                // formData.set("code_nec", e.target.value);
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
                // formData.set("mode_penawaran", e.target.value);
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
                // formData.set("fakulti", e.target.value);
              }}
              placeholderOptions={"Sila Pilih Fakulti"}
            />
            <JangkaPengajianSepenuhMasa />
            <JangkaPengajianSeparuhMasa />

            <div className="flex w-full items-center">
              <label htmlFor="mod_penyampaian" className="label-input-msa">
                Mod Penyampaian
              </label>
              <div className="w-full flex justify-between">
                <div className="flex items-start ">
                  <div className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="mod_penyampaian"
                      id="konvensional"
                      value={"Konvensional/Terbuka"}
                      className="checkbox  mr-2"
                      onChange={handleModPenyampaianChange}
                    />
                    <label htmlFor="konvensional" className=" text-md">
                      Konvensional/Terbuka
                    </label>
                  </div>
                  <div className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="mod_penyampaian"
                      value={"Jarak Jauh (ODL)"}
                      id="ODL"
                      className="checkbox  mr-2"
                      onChange={handleModPenyampaianChange}
                    />
                    <label htmlFor="ODL" className=" text-md">
                      Jarak Jauh (ODL)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenu
              label={"Struktur Program"}
              options={struktur_program}
              labelId={"struktur_program"}
              onChange={(e) => {
                setStruktur(e.target.value);
                // mp.setStrukturProgram(e.target.value);
                // formData.set("struktur_program", e.target.value);
              }}
              value={struktur}
              placeholderOptions={"Sila Pilih Struktur Program"}
            />
            <ProgramKerjasama />

            {/* mesy jkpt */}
            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKPT</h2>

            <DatePicker
              label={"Tarikh Surat"}
              name={"tarikhSurat"}
              onChange={(e) => {
                setTarikhSurat(e.target.value);
              }}
            />
            <DatePicker
              label={"Tarikh Terima Surat"}
              name={"tarikhTerimaSurat"}
            />
            <div className="flex mb-4 items-center">
              <label htmlFor="tarikhMesyuaratJKPT" className="label-input-msa">
                Tarikh Mesyuarat
              </label>
              <div className="w-full">
                <input
                  type="date"
                  required
                  id="tarikhMesyuaratJKPT"
                  name="tarikhMesyuaratJKPT"
                  className="p-2 h-12 rounded-lg border w-full"
                />
              </div>
            </div>

            <TarikhSuratContext.Provider value={tarikhSurat}>
              <TempohSah />
            </TarikhSuratContext.Provider>
            <BilMesyuarat />
            <MuatNaikSurat label={"Minit JKPT"} name="minitJKPT" />

            {/* Mesy JKA */}

            <h2 className="text-xl  font-bold text-center ">Mesyuarat JKA</h2>
            <div className="flex mb-4 items-center">
              <label htmlFor="tarikhMesyuaratJKPT" className="label-input-msa">
                Tarikh Mesyuarat JKA
              </label>
              <div className="w-full">
                <input
                  type="date"
                  required
                  id="tarikhMesyuaratJKA"
                  name="tarikhMesyuaratJKA"
                  className="p-2 h-12 rounded-lg border w-full"
                  // onChange={(e) => {

                  // }}
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

export default MsaForm_onePage;
