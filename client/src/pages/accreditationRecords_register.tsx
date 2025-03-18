import { useParams } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";
import DropdownUpdate from "../components/msaForm/DropDownUpdate";
import { useForm } from "react-hook-form";
import DateUpdate from "../components/msaForm/DateUpdate";
import MuatNaikSurat from "../components/msaForm/MuatNaikSurat";

const Accreditation_register = () => {
  const { id, nama_program } = useParams();
  const { darkMode } = useThemeStore();
  const {
    register,
    // formState: { errors },
    // handleSubmit,
  } = useForm({});

  return (
    <div className={`container mt-5 mx-auto h-screen p-4`}>
      <h1 className="text-xl font-bold  mt-4 mb-4">
        Rekod Permohonan Akreditasi :{" "}
        <span className="font-bold">{nama_program}</span>{" "}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/program-list">Program List For MSA Application</a>
          </li>
          <li>
            <a href={`/akreditasi-program/${id}/${nama_program}`}>
              Rekod Akreditasi Program: {nama_program}
            </a>
          </li>
          <li>Rekod Permohonan Akreditasi</li>
        </ul>
      </div>
      {/* Breadcrumbs */}

      <div
        className={`container mt-10 mb-32 mx-auto flex flex-col ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 rounded-md shadow-md`}
      >
        <DropdownUpdate
          label="Jenis Akreditasi"
          labelId="accreditationType"
          defaultValue={"placeholder"}
          placeholderOptions="Pilih Jenis Akreditasi"
          options={["Full Acreditation (FA)", "Partial Acreditation (PA)"]}
          register={register}
        />

        <DateUpdate
          name="uploadDate"
          label="Tarikh Penghantaran Permohonan Akreditasi"
          register={register}
          defValue={new Date("YYYY-MM-DD")}
          className="mt-3"
        />
        {/* <DateUpdate
          name="accreditationStartDate"
          label="Tarikh Mula Akreditasi"
          register={register}
          defValue={new Date("YYYY-MM-DD")}
        />

        <DateUpdate
          name="accreditationEndDate"
          label="Tarikh Akhir Akreditasi"
          register={register}
          defValue={new Date("YYYY-MM-DD")}
        /> */}

        <MuatNaikSurat
          label="Borang Permohonan Akreditasi"
          name="accreditationForm"
        />
      </div>
    </div>
  );
};

export default Accreditation_register;
