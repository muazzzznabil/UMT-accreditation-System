// import { MesyJKPT } from "../../model/mesyJKPT_model";

interface BilMesyuaratProps {
  bilMesyuarat?: string;
}
const BilMesyuarat: React.FC<BilMesyuaratProps> = ({ bilMesyuarat }) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="bilMesyuarat" className="label-input-msa">
        Bil Mesyuarat
      </label>
      <div className="w-full flex items-center ">
        <input
          type="text"
          id="bilMesyuarat"
          required
          value={bilMesyuarat}
          name="bilMesyuarat"
          className="input input-bordered w-1/6"
          placeholder=" Bil. / Tahun"
          // onChange={(e) => formData.set("bilMesyuarat", e.target.value)}
        />
      </div>
    </div>
  );
};

export default BilMesyuarat;
