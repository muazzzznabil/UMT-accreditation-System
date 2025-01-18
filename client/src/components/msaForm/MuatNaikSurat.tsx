// import { useState } from "react";
// import { MesyJKPT } from "../../model/mesyJKPT_model";

interface Props {
  label: string;
  // jkpt_model: MesyJKPT;
  formData: FormData;
}

const MuatNaikSurat = ({ label, formData }: Props) => {
  // const [jkpt, setJkpt] = useState<{ minitJKPT: File | null }>({
  //   minitJKPT: null,
  // });
  // const [file, setFile] = useState<File | undefined>();

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0]; // Get the file from input
    if (!selectedFile) return; // Ensure a file is selected

    // setFile(selectedFile);
    const file = new FileReader();
    // formData.append("suratMSA", target.files[0]);
    file.onload = function () {
      console.log("file.result", file.result);
      // setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
    console.log("file", file);
    if (typeof file === "undefined") return;
    formData.append("minitJKPT", selectedFile);
  };

  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="minitJKPT" className="label-input-msa">
        {label}
      </label>
      <div className="w-full flex items-center">
        <input
          type="file"
          id="minitJKPT"
          name="minitJKPT"
          className="file-input file-input-bordered w-1/2"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default MuatNaikSurat;
