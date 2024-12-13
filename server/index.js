const express = require("express");
const cors = require("cors");
const pool = require("./data/database");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//Routes
app.post("/maklumat-program", async function (req, res) {
  try {
    const { maklumat } = req.body;
    const [newProgramme] = await pool
      .promise()
      .query(
        "INSERT INTO maklumatprogram (tahap_kkm, sektor_akademi, code_nec, mode_penawaran, fakulti, jenis_pengajian, min_tahun, min_bulan, min_semester, max_tahun, max_bulan, max_semester, mod_penyampaian, struktur_program, program_kerjasama, jenis_kerjasama,nama_program) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        Object.values(maklumat)
      );
    res.status(201).json({ message: "Programme added successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while adding the programme." });
  }
});
