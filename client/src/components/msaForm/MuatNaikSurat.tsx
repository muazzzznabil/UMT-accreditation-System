import { MesyJKPT } from "../../model/mesyJKPT_model";

interface Props {
  label: string;
  jkpt_model: MesyJKPT;
}

const MuatNaikSurat = ({ label, jkpt_model }: Props) => {
  // const [jkpt, setJkpt] = useState<{ minitJKPT: File | null }>({
  //   minitJKPT: null,
  // });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      jkpt_model.setMinitJKPT(e.target.files[0]);
    }
  };

  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="suratMSA" className="label-input-msa">
        {label}
      </label>
      <div className="w-full flex items-center">
        <input
          type="file"
          id="suratMSA"
          name="suratMSA"
          className="file-input file-input-bordered w-1/2"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default MuatNaikSurat;
