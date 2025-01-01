import { useState } from "react";
import { MaklumatProgramModel } from "../../model/maklumat_program_model"

interface CheckBoxProps {
    mp: MaklumatProgramModel;
}

const CheckBox:React.FC<CheckBoxProps> = ({mp}) => {

    // const mp = new MaklumatProgramModel();

    const [checked, setChecked] = useState<boolean>(false);
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        mp.setModPenyampaian(checked ? ['Konvensional/Terbuka', 'Jarak Jauh (ODL)'] : []);
    };

    return (
        <div className="flex w-full items-center">
            <label htmlFor="mod_penyampaian" className="label-input-msa">
                Mod Penyampaian
            </label>
            <div className="w-full flex justify-between">
                <div className="flex items-start ">
                    <div className='inline-flex items-center mr-4'>
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
                    <div className='inline-flex items-center'>
                        <input 
                            type="checkbox" 
                            name="mod_penyampaian" 
                            id="ODL" 
                            className="checkbox  mr-2" 
                            onChange={handleCheckboxChange}/>
                        <label htmlFor="ODL" className=" text-md">
                        Jarak Jauh (ODL)  
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckBox
