const express = require("express");
const router = express.Router();
const db = require("../data/database");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/documents/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const upload = multer({ dest: "/uploads/documents" });
const upload = multer({ storage: storage });

//insert data into maklumat program
router.post(
  "/maklumat-program",
  upload.single("minitJKPT"),
  async function (req, res) {
    const msaFilePath = `/uploads/documents/${req.file.filename}`;
    const query = `
    INSERT INTO maklumat_program 
(nama_program, 
 tahapMQF, 
 sektorAkademik, 
 code_nec, 
 mode_penawaran, 
 fakulti, 
 Sepenuh_max_Tahun, 
 Sepenuh_max_Minggu, 
 Sepenuh_max_Semester, 
 Sepenuh_min_Tahun, 
 Sepenuh_min_Minggu, 
 Sepenuh_min_Semester, 
 Sepenuh_SemesterPanjang_Semester, 
 Sepenuh_SemesterPendek_Semester, 
 Sepenuh_LatihanIndustri_Semester, 
 Separuh_max_Tahun, 
 Separuh_max_Minggu, 
 Separuh_max_Semester, 
 Separuh_min_Tahun, 
 Separuh_min_Minggu, 
 Separuh_min_Semester, 
 Separuh_SemesterPanjang_Semester, 
 Separuh_SemesterPendek_Semester, 
 Separuh_LatihanIndustri_Semester, 
 mod_penyampaian, 
 struktur_program, 
 program_kerjasama, 
 jenis_kerjasama, 
 tarikhSurat, 
 tarikhTerimaSurat, 
 tarikhMesyuarat, 
 tempohSah, 
 sahSehingga, 
 bilMesyuarat, 
 minitJKPT)
VALUES (?)
  `;
    const maklumat = [
      req.body.nama_program,
      req.body.tahapMQF,
      req.body.sektorAkademik,
      req.body.code_nec,
      req.body.mode_penawaran,
      req.body.fakulti,
      req.body.Sepenuh_max_Tahun,
      req.body.Sepenuh_max_Minggu,
      req.body.Sepenuh_max_Semester,
      req.body.Sepenuh_min_Tahun,
      req.body.Sepenuh_min_Minggu,
      req.body.Sepenuh_min_Semester,
      req.body.Sepenuh_SemesterPanjang_Semester,
      req.body.Sepenuh_SemesterPendek_Semester,
      req.body.Sepenuh_LatihanIndustri_Semester,
      req.body.Separuh_max_Tahun,
      req.body.Separuh_max_Minggu,
      req.body.Separuh_max_Semester,
      req.body.Separuh_min_Tahun,
      req.body.Separuh_min_Minggu,
      req.body.Separuh_min_Semester,
      req.body.Separuh_SemesterPanjang_Semester,
      req.body.Separuh_SemesterPendek_Semester,
      req.body.Separuh_LatihanIndustri_Semester,
      req.body.mod_penyampaian,
      req.body.struktur_program,
      req.body.program_kerjasama,
      req.body.jenis_kerjasama,
      req.body.tarikhSurat,
      req.body.tarikhTerimaSurat,
      req.body.tarikhMesyuarat,
      req.body.sahSehingga,
      req.body.tempohSah,
      req.body.bilMesyuarat,
      msaFilePath,
    ];
    try {
      console.log(maklumat);

      await db.query(query, maklumat);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

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
  const query = "SELECT * FROM maklumat_program where id = ?";
  try {
    const [result] = await db.query(query, req.params.id);
    console.table(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
//update table
router.put("/maklumat-program/:id/edit", async function (req, res) {
  const { id } = req.params;
  const {
    nama_program,
    tahapMQF,
    sektorAkademik,
    code_nec,
    mode_penawaran,
    fakulti,
    Sepenuh_max_Tahun,
    Sepenuh_max_Minggu,
    Sepenuh_max_Semester,
    Sepenuh_min_Tahun,
    Sepenuh_min_Minggu,
    Sepenuh_min_Semester,
    Sepenuh_SemesterPanjang_Semester,
    Sepenuh_SemesterPendek_Semester,
    Sepenuh_LatihanIndustri_Semester,
    Separuh_max_Tahun,
    Separuh_max_Minggu,
    Separuh_max_Semester,
    Separuh_min_Tahun,
    Separuh_min_Minggu,
    Separuh_min_Semester,
    Separuh_SemesterPanjang_Semester,
    Separuh_SemesterPendek_Semester,
    Separuh_LatihanIndustri_Semester,
    mod_penyampaian,
    struktur_program,
    program_kerjasama,
    jenis_kerjasama,
  } = req.body;

  const query = `
    UPDATE maklumat_program
    SET nama_program = ?, tahapMQF = ?, sektorAkademik = ?, code_nec = ?, mode_penawaran = ?, 
    fakulti = ?, Sepenuh_max_Tahun = ?, Sepenuh_max_Minggu = ?, Sepenuh_max_Semester = ?, 
    Sepenuh_min_Tahun = ?, Sepenuh_min_Minggu = ?, Sepenuh_min_Semester = ?, 
    Sepenuh_SemesterPanjang_Semester = ?, Sepenuh_SemesterPendek_Semester = ?, 
    Sepenuh_LatihanIndustri_Semester = ?, Separuh_max_Tahun = ?, Separuh_max_Minggu = ?, 
    Separuh_max_Semester = ?, Separuh_min_Tahun = ?, Separuh_min_Minggu = ?, 
    Separuh_min_Semester = ?, Separuh_SemesterPanjang_Semester = ?, Separuh_SemesterPendek_Semester = ?, 
    Separuh_LatihanIndustri_Semester = ?, mod_penyampaian = ?, struktur_program = ?, program_kerjasama = ?, 
    jenis_kerjasama = ? WHERE id = ?`;

  try {
    await db.query(query, [
      nama_program,
      tahapMQF,
      sektorAkademik,
      code_nec,
      mode_penawaran,
      fakulti,
      Sepenuh_max_Tahun,
      Sepenuh_max_Minggu,
      Sepenuh_max_Semester,
      Sepenuh_min_Tahun,
      Sepenuh_min_Minggu,
      Sepenuh_min_Semester,
      Sepenuh_SemesterPanjang_Semester,
      Sepenuh_SemesterPendek_Semester,
      Sepenuh_LatihanIndustri_Semester,
      Separuh_max_Tahun,
      Separuh_max_Minggu,
      Separuh_max_Semester,
      Separuh_min_Tahun,
      Separuh_min_Minggu,
      Separuh_min_Semester,
      Separuh_SemesterPanjang_Semester,
      Separuh_SemesterPendek_Semester,
      Separuh_LatihanIndustri_Semester,
      JSON.stringify(mod_penyampaian),
      struktur_program,
      program_kerjasama,
      jenis_kerjasama,
      id,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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

//--------------------testing--------------------
//insert data into maklumat program with file
router.post(
  "/maklumat-program-file-test",
  upload.single("pdfFile"),
  async function (req, res) {
    const relativeFilePath = `/uploads/documents/${req.file.filename}`;
    const query = `insert into testTable (nama, file,eduInfo) values (?, ?, ?)`;
    try {
      await db.query(query, [
        req.body.nama,
        relativeFilePath,
        req.body.eduInfo,
      ]);
      console.log("Received file:", req.file);
      console.log("Request body:", req.body);
      res.json(req.file);
      // res.status(201).send("Success");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

    //so when we wan to upload to database, we can use req.file.path
  }
);

//get all data from testTable
router.get("/maklumat-program-file-test/:id/get", async function (req, res) {
  const query = `select * from testTable where id = ?`;
  try {
    const [result] = await db.query(query, [req.params.id]);

    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }

    const data = result[0];
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
});

router.get("/uploads/documents/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/documents/",
    req.params.filename
  );
  res.sendFile(filePath);
});
// ----------------------------------------------
module.exports = router;
