const express = require("express");
const router = express.Router();
const db = require("../data/database");



//insert data into maklumat program 
router.post("/maklumat-program", async function (req, res) {
  const query = `
    INSERT INTO maklumat_program 
    (nama_program, tahapMQF, sektorAkademik, code_nec, mode_penawaran, 
    fakulti, Sepenuh_max_Tahun, Sepenuh_max_Minggu, Sepenuh_max_Semester, 
    Sepenuh_min_Tahun, Sepenuh_min_Minggu, Sepenuh_min_Semester,
    Sepenuh_SemesterPanjang_Semester, Sepenuh_SemesterPendek_Semester, 
    Sepenuh_LatihanIndustri_Semester, Separuh_max_Tahun, Separuh_max_Minggu, 
    Separuh_max_Semester, Separuh_min_Tahun, Separuh_min_Minggu, Separuh_min_Semester,
    Separuh_SemesterPanjang_Semester, Separuh_SemesterPendek_Semester,
    Separuh_LatihanIndustri_Semester, mod_penyampaian, struktur_program,
    program_kerjasama, jenis_kerjasama)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const maklumat = [
    req.body.nama_program, req.body.tahapMQF, req.body.sektorAkademik,
    req.body.code_nec, req.body.mode_penawaran, req.body.fakulti, 
    req.body.Sepenuh_max_Tahun, req.body.Sepenuh_max_Minggu, req.body.Sepenuh_max_Semester, 
    req.body.Sepenuh_min_Tahun, req.body.Sepenuh_min_Minggu, req.body.Sepenuh_min_Semester, 
    req.body.Sepenuh_SemesterPanjang_Semester, req.body.Sepenuh_SemesterPendek_Semester, 
    req.body.Sepenuh_LatihanIndustri_Semester, req.body.Separuh_max_Tahun, req.body.Separuh_max_Minggu, 
    req.body.Separuh_max_Semester, req.body.Separuh_min_Tahun, req.body.Separuh_min_Minggu, 
    req.body.Separuh_min_Semester, req.body.Separuh_SemesterPanjang_Semester, req.body.Separuh_SemesterPendek_Semester, 
    req.body.Separuh_LatihanIndustri_Semester, JSON.stringify(req.body.mod_penyampaian), req.body.struktur_program, 
    req.body.program_kerjasama, req.body.jenis_kerjasama
  ];
  try {
    console.log(maklumat);

    await db.query(query, maklumat);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//select all from table
router.get("/maklumat-program", async function (req, res) {
  const query = "SELECT id,nama_program,fakulti FROM maklumat_program";
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//select specific program
router.get("/maklumat-program/:id", async function (req, res) {
  const query = "SELECT * FROM maklumatProgramTest where id = ?";
  try {
    const [result] = await db.query(query, req.params.id);
    console.table(result);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});
//update table
router.put("/maklumat-program/:id/edit", async function (req, res) {
  const { id } = req.params;
  const { nama_program, fakulti } = req.body;
  const query =
    "UPDATE maklumatProgramTest SET nama_program = ?, fakulti = ? WHERE id = ?";

  try {
    await db.query(query, [nama_program, fakulti, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

//delete
router.delete("/maklumat-program/:id/delete", async function (req, res) {
  const query = `DELETE FROM maklumat_program where id = ?`;
  try {
    await db.query(query, req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});














module.exports = router;
