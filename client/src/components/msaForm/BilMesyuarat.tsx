import { MesyJKPT } from "../../model/mesyJKPT_model";

interface props {
  mesyJKPT: MesyJKPT;
}

const BilMesyuarat: React.FC<props> = ({ mesyJKPT }) => {
  return (
    <div className="flex mb-4 items-center">
      <label htmlFor="bilMesyuarat" className="label-input-msa">
        Bil Mesyuarat
      </label>
      <div className="w-full flex items-center ">
        <input
          type="text"
          id="bilMesyuarat"
          name="bilMesyuarat"
          className="input input-bordered w-1/6"
          placeholder=" Bil. / Tahun"
          onChange={(e) => mesyJKPT.setBilMesyuarat(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BilMesyuarat;
