import { useState } from "react";

interface ReportGeneratorProps {
  onGenerate: (filters: ReportFilters) => void;
}

export interface ReportFilters {
  payment: boolean;
  program: boolean;
  evaluator: boolean;
  application: boolean;
  accreditation: boolean;
}

const ReportGenerator = ({ onGenerate }: ReportGeneratorProps) => {
  const [reportFilters, setReportFilters] = useState<ReportFilters>({
    payment: false,
    program: false,
    evaluator: false,
    application: false,
    accreditation: false,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportFilters({ ...reportFilters, [e.target.name]: e.target.checked });
  };

  return (
    <div className="container mx-auto mt-5 font-sans space-y-2 ">
      <h1 className="text-3xl font-semibold">Janaan Laporan</h1>
      <div className="breadcrumbs text-md mb-2">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>Janaan Laporan</li>
        </ul>
      </div>
      <div className="container mx-auto mt-8 p-6 bg-base-100 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Pilih laporan untuk Dijana</h2>

        <div className="mb-4 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="program"
              checked={reportFilters.program}
              onChange={handleFilterChange}
            />
            Butiran Program
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="payment"
              checked={reportFilters.payment}
              onChange={handleFilterChange}
            />
            Rekod Pembayaran
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="evaluator"
              checked={reportFilters.evaluator}
              onChange={handleFilterChange}
            />
            Penilai Dalaman
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="application"
              checked={reportFilters.application}
              onChange={handleFilterChange}
            />
            Permohonan Akreditasi
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              name="accreditation"
              checked={reportFilters.accreditation}
              onChange={handleFilterChange}
            />
            Akreditasi
          </label>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => onGenerate(reportFilters)}
          disabled={Object.values(reportFilters).every((v) => !v)}
        >
          Jana Laporan
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;
