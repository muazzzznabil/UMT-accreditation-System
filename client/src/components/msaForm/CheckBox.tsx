import { useState } from "react";
import { MaklumatProgramModel } from "../../model/maklumat_program_model";

interface CheckBoxProps {
  mp: MaklumatProgramModel;
}

const CheckBox: React.FC<CheckBoxProps> = ({ mp }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id; // Get the checkbox ID (e.g., "konvensional", "ODL")
    const isChecked = e.target.checked;

    const updatedValues = isChecked
      ? [...selectedValues, value] // Add value if checked
      : selectedValues.filter((item) => item !== value); // Remove value if unchecked

    setSelectedValues(updatedValues);

    mp.setModPenyampaian(updatedValues.join(","));
  };

  return (
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
              className="checkbox  mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="konvensional" className=" text-md">
              Konvensional/Terbuka
            </label>
          </div>
          <div className="inline-flex items-center">
            <input
              type="checkbox"
              name="mod_penyampaian"
              id="ODL"
              className="checkbox  mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="ODL" className=" text-md">
              Jarak Jauh (ODL)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
