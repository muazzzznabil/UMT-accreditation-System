import express from "express";
import db from "../data/database.js";
import PDFDocument from "pdfkit";
import dayjs from "dayjs";

const router = express.Router();

// POST /report/generate
router.post("/generate", async (req, res) => {
  const { program_id, filters } = req.body;
  if (!program_id || !filters) {
    return res.status(400).json({ error: "Missing program_id or filters" });
  }

  // Prepare data containers
  let programDetails = null;
  let paymentRecords = [];
  let evaluators = [];
  let applications = [];
  let accreditations = [];

  // Fetch data based on filters
  try {
    if (filters.program) {
      const [result] = await db.query(
        `SELECT * FROM maklumat_program WHERE id = ?`,
        [program_id]
      );
      programDetails = result[0];
    }
    if (filters.payment) {
      const [result] = await db.query(
        `SELECT * FROM payment WHERE program_id = ?`,
        [program_id]
      );
      paymentRecords = result;
    }
    if (filters.evaluator) {
      const [result] = await db.query(
        `SELECT * FROM evaluator WHERE program_id = ?`,
        [program_id]
      );
      evaluators = result;
    }
    if (filters.application) {
      const [result] = await db.query(
        `SELECT * FROM accreditation_application WHERE program_id = ?`,
        [program_id]
      );
      applications = result;
    }
    if (filters.accreditation) {
      const [result] = await db.query(
        `SELECT * FROM accreditation WHERE program_id = ?`,
        [program_id]
      );
      accreditations = result;
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Database error", details: err.message });
  }

  // Generate PDF
  try {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    doc.pipe(res);
    doc
      .fontSize(14)
      .text("Pusat Pengurusan Dan Penjaminan Kualiti UMT", { align: "center" });
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text(`Laporan Program : ${req.body.name} `, { align: "center" });
    doc.moveDown();

    if (programDetails) {
      doc.font("Helvetica"); // Reset to normal font for following text
      doc.moveDown();
      doc.fontSize(14).text("Butiran Program", { bold: true });
      doc.moveDown(0.5);
      // Build a table from the programDetails object (not an array)
      const detailTable = [
        ["Tahap MQF", programDetails.tahapMQF],
        ["Sektor Akademik", programDetails.sektorAkademik],
        ["Code NEC", programDetails.code_nec],
        ["Mod Penwaran", programDetails.mode_penawaran],
        ["Fakulti", programDetails.fakulti],
      ];
      doc.table({
        data: detailTable,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
      doc.fontSize(14).text("Butiran Tambahan", { bold: true });
      doc.moveDown(0.5);
      const additionalDetailTable = [
        ["Struktur Program", programDetails.struktur_program],
        [
          "Program Kerjasama",
          programDetails.program_kerjasama === "True" ? "Ya" : "Tidak",
        ],
        ["Code NEC", programDetails.code_nec],
        ["Mod Penwaran", programDetails.mode_penawaran],
        ["Fakulti", programDetails.fakulti],
      ];
      doc.table({
        data: additionalDetailTable,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
      doc.fontSize(14).text("Jangka Pengajian Sepenuh Masa", { bold: true });
      doc.moveDown(0.5);
      const pengajianSepenuhMasa = [
        [
          "Bilangan Tahun",
          `${programDetails.Sepenuh_min_Tahun} Tahun hingga ${programDetails.Sepenuh_max_Tahun} Tahun`,
        ],
        [
          "Bilangan Minggu",
          `${programDetails.Sepenuh_min_Minggu} Minggu hingga ${programDetails.Sepenuh_max_Minggu} Minggu`,
        ],
        [
          "Bilangan Semester",
          `${programDetails.Sepenuh_min_Semester} Semester hingga ${programDetails.Sepenuh_max_Semester} Semester`,
        ],
        [
          "Semester Panjang",
          `${programDetails.Sepenuh_SemesterPanjang_Semester} Semester`,
        ],
        [
          "Semester Pendek",
          `${programDetails.Sepenuh_SemesterPendek_Semester} Semester`,
        ],
        [
          "Latihan Industri",
          `${programDetails.Sepenuh_LatihanIndustri_Semester} Semester`,
        ],
      ];
      doc.table({
        data: pengajianSepenuhMasa,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
      doc.fontSize(14).text("Jangka Pengajian Separuh Masa", { bold: true });
      doc.moveDown(0.5);
      const pengajianSeparuhMasa = [
        [
          "Bilangan Tahun",
          `${programDetails.Separuh_min_Tahun} Tahun hingga ${programDetails.Separuh_max_Tahun} Tahun`,
        ],
        [
          "Bilangan Minggu",
          `${programDetails.Separuh_min_Minggu} Minggu hingga ${programDetails.Separuh_max_Minggu} Minggu`,
        ],
        [
          "Bilangan Semester",
          `${programDetails.Separuh_min_Semester} Semester hingga ${programDetails.Separuh_max_Semester} Semester`,
        ],
        [
          "Semester Panjang",
          `${programDetails.Separuh_SemesterPanjang_Semester} Semester`,
        ],
        [
          "Semester Pendek",
          `${programDetails.Separuh_SemesterPendek_Semester} Semester`,
        ],
        [
          "Latihan Industri",
          `${programDetails.Separuh_LatihanIndustri_Semester} Semester`,
        ],
      ];
      doc.table({
        data: pengajianSeparuhMasa,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
      doc.fontSize(14).text("Mesyuarat JKPT ", { bold: true });
      doc.moveDown(0.5);
      // Build a table from the programDetails object (not an array)
      const mesyJKPT = [
        [
          "Tarikh Surat MSA",
          dayjs(programDetails.tarikh_surat).format("DD/MM/YYYY"),
        ],
        [
          "Tarikh Terima Surat MSA:",
          dayjs(programDetails.tarikhTerimaSurat).format("DD/MM/YYYY"),
        ],
        [
          "Tarikh Mesyuarat JKPT",
          dayjs(programDetails.tarikhMesyuarat).format("DD/MM/YYYY"),
        ],
        ["Tempoh Sah MSA", programDetails.tempohSah + " Tahun"],
        [
          "Sah Sehingga",
          dayjs(programDetails.sahSehingga).format("DD/MM/YYYY"),
        ],
        ["Bil Mesyuarat JKPT", "bil." + programDetails.bilMesyuarat],
      ];
      doc.table({
        data: mesyJKPT,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
      doc.fontSize(14).text("Mesyuarat JKA ", { bold: true });
      doc.moveDown(0.5);
      // Build a table from the programDetails object (not an array)
      const mesyJKA = [
        [
          "Tarikh Mesyuarat JKA",
          dayjs(programDetails.tarikMesyJKA).format("DD/MM/YYYY"),
        ],

        ["Bil Mesyuarat JKA", "bil." + programDetails.bilMesyuaratJKA],
      ];
      doc.table({
        data: mesyJKA,
        fontSize: 10,

        columnStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
    }
    if (evaluators.length > 0) {
      doc.fontSize(14).text("Penilai Dalaman", { underline: true });
      evaluators.forEach((ev, idx) => {
        doc.fontSize(12).text(`${idx + 1}. ${ev.name || ev.nama || "-"}`);
      });
      doc.moveDown();
    }
    if (applications.length > 0) {
      doc.fontSize(14).text("Permohonan Akreditasi", { underline: true });
      doc.moveDown(0.5);
      // Group applications by type
      const grouped = {};
      applications.forEach((app) => {
        const type = app.application_type || "Lain-lain";
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(app);
      });
      Object.entries(grouped).forEach(([type, apps]) => {
        doc.fontSize(12).text(type, { bold: true });
        const tableData = [
          ["Bil", "Status", "Tarikh Permohonan"],
          ...apps.map((app, idx) => [
            idx + 1,
            app.application_status || "-",
            app.application_submission_date
              ? dayjs(app.application_submission_date).format("DD/MM/YYYY")
              : "-",
            // app.accreditation_extension_number || "-",
          ]),
        ];
        doc.table({
          data: tableData,
          fontSize: 10,
          rowStyles: (i) => {
            if (i === 0)
              return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
          },
        });
        doc.moveDown();
      });
    }
    if (paymentRecords.length > 0) {
      doc.fontSize(14).text("Rekod Pembayaran :", { underline: false });
      doc.moveDown(0.5);
      // Build table data: header + all payment rows
      const tableData = [
        [
          "Jenis Pembayaran",
          "Jumlah bayaran",
          "Tarikh Pembayaran",
          "Cara Pembayaran",
          "Catatan Pembayaran",
        ],
        ...paymentRecords.map((pay) => [
          pay.payment_type,
          "MYR" + pay.payment_amount,
          dayjs(pay.payment_date).format("DD/MM/YYYY"),
          pay.payment_method,
          pay.payment_description,
        ]),
      ];
      doc.fontSize(10).table({
        fontSize: 8,
        data: tableData,
        rowStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
    }
    // Add Akreditasi section
    if (typeof accreditations !== "undefined" && accreditations.length > 0) {
      doc.fontSize(14).text("Laporan Akreditasi", { underline: true });
      doc.moveDown(0.5);
      const accreditationTable = [
        ["No.", "Status", "Tarikh Mula", "Tarikh Tamat", "No. MQA"],
        ...accreditations.map((acc, idx) => [
          idx + 1,
          acc.accreditationStatus || "-",
          acc.accreditationStartDate
            ? dayjs(acc.accreditationStartDate).format("DD/MM/YYYY")
            : "-",
          acc.accreditationEndDate
            ? dayjs(acc.accreditationEndDate).format("DD/MM/YYYY")
            : "-",
          acc.no_mqa || "-",
        ]),
      ];
      doc.fontSize(10).table({
        fontSize: 8,
        data: accreditationTable,
        rowStyles: (i) => {
          if (i === 0)
            return { backgroundColor: "#e5e7eb", fontWeight: "bold" };
        },
      });
      doc.moveDown();
    }
    doc.end();
  } catch (err) {
    res
      .status(500)
      .json({ error: "PDF generation error", details: err.message });
  }
});

export default router;
