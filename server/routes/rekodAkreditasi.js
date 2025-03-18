const express = require("express");
const router = express.Router();
const db = require("../data/database");
const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/accreditation/"));
  },
  filename: function (req, file, cb) {
    const { id } = req.params; // Get the program ID from the request parameters
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const baseName = path.basename(file.originalname, fileExtension); // Get the base name of the file
    const newFileName = `${baseName}_${id}${fileExtension}`; // Construct the new file name with the program ID
    cb(null, newFileName);
  },
});
const upload = multer({
  storage: storage,
});

// Permohonan Akreditasi PA/FA
router.post(
  "/permohonan-akreditasi",
  upload.single("application_form"),
  async function (req, res) {
    if (!req.file) {
      return res.status(405).send("No file uploaded");
    }
    const relativeFilePath = `/uploads/accreditation/${req.file.filename}`;
    const data = [
      req.body.program_id,
      relativeFilePath,
      req.body.application_status,
      req.body.application_accreditation_type,
      dayjs(req.body.uploadDate).format("YYYY-MM-DD"),
    ];
    const query = `
       INSERT INTO accreditation_application (
        program_id,
        application_path,
        application_status,
        application_type,
        application_submission_date	
      ) VALUES (?, ?, ?, ?, ?)`;
    try {
      await db.query(query, data);
      console.log("Success");
      res.status(200).send("File uploaded and data inserted successfully");
    } catch (error) {
      console.error("Error inserting into accreditation_application:", error);
      console.table(data);
      res.status(500).send("Error inserting into accreditation_application");
    }
  }
);

router.get("/senarai-permohonan-akreditasi", async function (req, res) {
  const query = `
    SELECT 
      accreditation_application.*,
      maklumat_program.nama_program AS program_name
    FROM 
      accreditation_application
    INNER JOIN 
      maklumat_program ON accreditation_application.program_id = maklumat_program.id
  `;
  try {
    const [result] = await db.query(query, [req.params.id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching accreditation application:", error);
    res.status(500).send("Server error");
  }
});

//delete multiple accreditation
router.delete(
  "/permohonan-akreditasi/delete-multiple",
  async function (req, res) {
    const { ids } = req.body; // Expecting an array of IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty ID list" });
    }

    const placeholders = ids.map(() => "?").join(","); // Create (?, ?, ?...) dynamically
    const query = `DELETE FROM accreditation_application WHERE id IN (${placeholders})`;

    try {
      await db.query(query, ids);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete application" });
    }
  }
);

// Rekod Akreditasi
router.post(
  "/tambah-akreditasi/:id",
  upload.single("file_akreditasi"),
  async function (req, res) {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const relativeFilePath = `/uploads/documents/${req.file.filename}`;
    const query = `
      INSERT INTO accreditation (
        accreditationType,
        uploadDate,
        accreditationStartDate,
        accreditationEndDate,
        accreditationStatus,
        accreditationFilePath,
        program_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      await db.query(query, [
        req.body.accreditationType,
        req.body.uploadDate,
        req.body.accreditationStartDate,
        req.body.accreditationEndDate,
        req.body.accreditationStatus,
        relativeFilePath,
        req.params.id,
      ]);
      console.log("Success");
      res.status(200).send("File uploaded and data inserted successfully");
    } catch (error) {
      console.error("Error inserting into accreditation:", error);
      res.status(500).send("Error inserting into accreditation");
    }
  }
);

router.get("/uploads/accreditation/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/accreditation/",
    req.params.filename
  );
  res.sendFile(filePath);
});

module.exports = router;
