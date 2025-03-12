/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface Evaluator {
  id: number;
  name: string;
  evaluator_name: string;
  evaluator_email: string;
  evaluator_phone: string;
  evaluator_faculty: string;
  evaluator_position: string;
  evaluator_status: string;
  evaluator_field: string;
  evaluator_appointment_date: Date;
  program_id: number;
}

const InternalEvaluator_view = () => {
  const { name, id, id_program } = useParams();
  const [evaluator, setEvaluator] = useState<Evaluator | null>(null);

  const getEvaluator = async () => {
    try {
      const response = await axios.get<Evaluator[]>(
        `http://localhost:5000/penilai-dalaman/penilai/${id}`
      );
      setEvaluator(response.data[0]);
      console.table(evaluator);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mendapatkan Program",
        text: "Berlaku ralat semasa mendapatkan program",
        footer: "Ralat :" + error.message,
        confirmButtonText: "Cuba Lagi",
      }).then((result: any) => {
        if (result.isConfirmed) {
          getEvaluator();
        }
      });
    }
  };

  return <div>InternalEvaluator_view</div>;
};

export default InternalEvaluator_view;
