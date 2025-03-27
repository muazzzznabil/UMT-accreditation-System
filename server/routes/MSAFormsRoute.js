import express from "express";
import db from "../data/database.js";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/documents/"));
  },
  filename: function (req, file, cb) {
    const { id } = req.params; // Get the program ID from the request parameters
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const baseName = path.basename(file.originalname, fileExtension); // Get the base name of the file
    const newFileName = `${baseName}_${id}${fileExtension}`; // Construct the new file name with the program ID
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

//insert data into maklumat program
router.post(
  "/maklumat-program",
  upload.fields([
    { name: "minitJKPT", maxCount: 1 },
    { name: "minitJKA", maxCount: 1 },
  ]),
  async function (req, res) {
    const minitJKPT = `/uploads/documents/${req.files.minitJKPT[0].filename}`;
    const minitJKA = `/uploads/documents/${req.files.minitJKA[0].filename}`;
    const setValueKerjasama =
      req.body.program_kerjasama == "True" ? req.body.jenis_kerjasama : null;

    const query = `
      INSERT INTO
        maklumat_program
      (
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
        konvensional,
        odl,
        struktur_program,
        program_kerjasama,
        jenis_kerjasama,
        tarikhSurat,
        tarikhTerimaSurat,
        tarikhMesyuarat,
        tempohSah,
        sahSehingga,
        bilMesyuarat,
        minitJKPT,
        tarikMesyJKA,
        bilMesyuaratJKA,
        minitJKA
      )
      VALUES
      (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
      );
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
      req.body.konvensional,
      req.body.ODL,
      req.body.struktur_program,
      req.body.program_kerjasama,
      setValueKerjasama,
      req.body.tarikhSurat,
      req.body.tarikhTerimaSurat,
      req.body.tarikhMesyuarat,
      req.body.tempohSahLaku,
      req.body.sahSehingga,
      req.body.bilMesyuarat,
      minitJKPT,
      req.body.tarikMesyJKA,
      req.body.bilMesyuaratJKA,
      minitJKA,
    ];
    try {
      console.table(maklumat);

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
    // console.table(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
//update table
router.put(
  "/maklumat-program/:id/edit2",
  upload.fields([
    { name: "minitJKPT", maxCount: 1 },
    { name: "minitJKA", maxCount: 1 },
  ]),
  async function (req, res) {
    const { id } = req.params;
    const setValueKerjasama =
      req.body.program_kerjasama == "True" ? req.body.jenis_kerjasama : null;

    // Handle minitJKPT file
    const minitJKPT =
      req.files.minitJKPT && req.files.minitJKPT[0]
        ? `/uploads/documents/${req.files.minitJKPT[0].filename}`
        : req.body.existingMinitJKPT;

    // Delete old JKPT file if new one is uploaded and old one exists
    if (req.files.minitJKPT && req.body.existingMinitJKPT) {
      const oldJKPTPath = path.join(
        __dirname,
        "..",
        req.body.existingMinitJKPT
      );
      try {
        fs.unlinkSync(oldJKPTPath);
        console.log("Old JKPT file deleted:", oldJKPTPath);
      } catch (err) {
        console.error("Error deleting old JKPT file:", err);
      }
    }

    // Handle minitJKA file
    const minitJKA =
      req.files.minitJKA && req.files.minitJKA[0]
        ? `/uploads/documents/${req.files.minitJKA[0].filename}`
        : req.body.existingMinitJKA;

    // Delete old JKA file if new one is uploaded and old one exists
    if (req.files.minitJKA && req.body.existingMinitJKA) {
      const oldJKAPath = path.join(__dirname, "..", req.body.existingMinitJKA);
      try {
        fs.unlinkSync(oldJKAPath);
        console.log("Old JKA file deleted:", oldJKAPath);
      } catch (err) {
        console.error("Error deleting old JKA file:", err);
      }
    }

    const query = `
      UPDATE maklumat_program 
      SET 
        nama_program = ?,
        tahapMQF = ?,
        sektorAkademik = ?,
        code_nec=?,
        mode_penawaran=?,
        fakulti=?,
        Sepenuh_max_Tahun = ?, 
        Sepenuh_max_Minggu = ?,
        Sepenuh_max_Semester = ?, 
        Sepenuh_min_Tahun = ?,
        Sepenuh_min_Minggu = ?,
        Sepenuh_min_Semester = ?, 
        Sepenuh_SemesterPanjang_Semester = ?,
        Sepenuh_SemesterPendek_Semester = ?, 
        Sepenuh_LatihanIndustri_Semester = ?,
        Separuh_max_Tahun = ?, 
        Separuh_max_Minggu = ?,
        Separuh_max_Semester = ?, 
        Separuh_min_Tahun = ?,
        Separuh_min_Minggu = ?,
        Separuh_min_Semester = ?, 
        Separuh_SemesterPanjang_Semester = ?,
        Separuh_SemesterPendek_Semester = ?, 
        Separuh_LatihanIndustri_Semester = ?,
        konvensional = ?,
        odl = ?,
        struktur_program = ?,
        program_kerjasama = ?,
        jenis_kerjasama = ?,
        tarikhSurat = ?,
        tarikhTerimaSurat = ?,
        tarikhMesyuarat = ?,
        tempohSah = ?,
        sahSehingga = ?,
        bilMesyuarat = ?,
        minitJKPT = ?,
        tarikMesyJKA = ?,
        bilMesyuaratJKA = ?,
        minitJKA = ?
      WHERE id = ?`;

    try {
      await db.query(query, [
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
        req.body.konvensional,
        req.body.ODL,
        req.body.struktur_program,
        req.body.program_kerjasama,
        setValueKerjasama,
        req.body.tarikhSurat,
        req.body.tarikhTerimaSurat,
        req.body.tarikhMesyuarat,
        req.body.tempohSahLaku,
        req.body.sahSehingga,
        req.body.bilMesyuarat,
        minitJKPT,
        req.body.tarikMesyJKA,
        req.body.bilMesyuaratJKA,
        minitJKA,
        id,
      ]);
      res.sendStatus(200);
      console.log("konv,odl", req.body.konvensional, req.body.ODL);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

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
export default router;
