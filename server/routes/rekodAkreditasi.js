import express from "express";
import db from "../data/database.js";
import multer from "multer";
import path from "path";
import dayjs from "dayjs";
import fs from "fs";

const __dirname = import.meta.dirname;
const router = express.Router();
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

// update Permohonan Akreditasi PA/FA
router.put(
  "/permohonan-akreditasi/:id",
  upload.single("application_form"),
  async function (req, res) {
    const relativeFilePath = req.file
      ? `/uploads/accreditation/${req.file.filename}`
      : req.body.existingApplication_path;

    if (req.file && req.body.existingApplication_path) {
      const oldFilePath = path.join(
        __dirname,
        "..",
        req.body.existingApplication_path
      );
      try {
        fs.unlinkSync(oldFilePath);
        console.log("Old file deleted:", oldFilePath);
      } catch (err) {
        console.error("Error deleting old file:", err);
      }
    }

    const data = [
      relativeFilePath,
      req.body.application_status,
      req.body.application_accreditation_type,
      dayjs(req.body.uploadDate).format("YYYY-MM-DD"),
      req.params.id,
    ];
    const query = `
       UPDATE accreditation_application
       SET 
        application_path = ?,
        application_status = ?,
        application_type = ?,
        application_submission_date = ?
      WHERE id = ?`;
    try {
      await db.query(query, data);
      console.log("Success");
      res.status(200).send("File uploaded and data updated successfully");
    } catch (error) {
      console.error("Error updating into accreditation_application:", error);
      console.table(data);
      res.status(500).send("Error updating into accreditation_application");
    }
  }
);

//select all application records
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

//select specific application records
router.get("/permohonan-akreditasi/:id/edit", async function (req, res) {
  const query = `
    SELECT 
      *
    FROM 
      accreditation_application
    WHERE 
      id = ?
  `;
  try {
    const [result] = await db.query(query, [req.params.id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching specific accreditation application:", error);
    res.status(500).send("Server error");
  }
});

//delete multiple accreditation application
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

// ** REKOD AKREDITASI ** //

// !INSERT Rekod Akreditasi
router.post(
  "/tambah-akreditasi/",
  upload.single("accreditationFilePath"),
  async function (req, res) {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const relativeFilePath = `/uploads/accreditation/${req.file.filename}`;
    const query = `
      INSERT INTO accreditation (
        accreditationStartDate,
        accreditationEndDate,
        accreditationStatus,
        accreditationFilePath,
        program_id,
        no_mqa,
        application_id
      ) VALUES ( ?, ?, ?, ?, ?, ? , ?);
    `;
    try {
      await db.query(query, [
        dayjs(req.body.accreditationStartDate).toDate(),
        dayjs(req.body.accreditationEndDate).toDate(),
        req.body.accreditationStatus,
        relativeFilePath,
        req.body.program_id,
        req.body.no_mqa,
        req.body.application_id,
      ]);
      console.log("Success");
      res.status(200).send("File uploaded and data inserted successfully");
    } catch (error) {
      console.error("Error inserting into accreditation:", error);
      res.status(500).send("Error inserting into accreditation");
    }
  }
);

// !GET Rekod Akreditasi based on specific program id
router.get(
  "/senarai-akreditasi-program/:program_id",
  async function (req, res) {
    const query = `
    SELECT 
     accreditation.*,
     application.*
    FROM
      accreditation as accreditation
    INNER JOIN
      accreditation_application as application ON accreditation.application_id = application.id
    WHERE 
     accreditation.program_id = ?
  `;
    try {
      const [result] = await db.query(query, [req.params.program_id]);
      if (result.length === 0) {
        return res.status(404).send("Data not found");
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching accreditation:", error);
      res.status(500).send("Server error");
    }
  }
);
// !GET Rekod Akreditasi based on specific accreditation id
router.get("/tambah-akreditasi/:id/program", async function (req, res) {
  const query = `
    SELECT 
     accreditation.*,
     application.*
    FROM
      accreditation as accreditation
    INNER JOIN
      accreditation_application as application ON accreditation.application_id = application.id
    WHERE 
     accreditation.accreditation_id = ?
  `;
  try {
    const [result] = await db.query(query, [req.params.id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching accreditation:", error);
    res.status(500).send("Server error");
  }
});

// !GET accreditation with application based on specific program id and application approved
router.get("/senarai-akreditasi/:program_id", async function (req, res) {
  const query = `
    SELECT 
     *
    FROM
      accreditation_application
    WHERE 
     program_id = ? AND accreditation_application.application_status = 'approved'
  `;
  try {
    const [result] = await db.query(query, [req.params.program_id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching accreditation application:", error);
    res.status(500).send("Server error");
  }
});

// !UPDATE Rekod Akreditasi based on specific accreditation id
router.put(
  "/tambah-akreditasi/:program_id/edit",
  upload.single("accreditationFilePath"),
  async function (req, res) {
    const relativeFilePath = req.file
      ? `/uploads/accreditation/${req.file.filename}`
      : req.body.existingApplication_path;

    if (req.file && req.body.existingApplication_path) {
      const oldFilePath = path.join(
        __dirname,
        "..",
        req.body.existingApplication_path
      );
      try {
        fs.unlinkSync(oldFilePath);
        console.log("Old file deleted:", oldFilePath);
      } catch (err) {
        console.error("Error deleting old file:", err);
      }
    }

    const data = [
      req.body.accreditationStartDate,
      req.body.accreditationEndDate,
      relativeFilePath,
      req.body.no_mqa,
      req.params.program_id,
    ];
    const query = `
       UPDATE accreditation
       SET 
        accreditationStartDate = ?,
        accreditationEndDate = ?,
        accreditationFilePath = ?,
        no_mqa = ?

      WHERE accreditation_id = ? `;
    try {
      await db.query(query, data);
      console.log("Success");
      res.status(200).send("File uploaded and data updated successfully");
    } catch (error) {
      console.error("Error updating into accreditation_application:", error);
      console.table(data);
      res.status(500).send("Error updating into accreditation_application");
    }
  }
);

// !DELETE Rekod Akreditasi based on specific accreditation id
router.delete("/senarai-akreditasi/delete", async function (req, res) {
  const { ids } = req.body; // Expecting an array of IDs

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or empty ID list" });
  }

  const placeholders = ids.map(() => "?").join(",");
  const query = `DELETE FROM accreditation WHERE accreditation_id IN (${placeholders})`;

  try {
    await db.query(query, ids);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

// ! File Route for Rekod Akreditasi
router.get("/uploads/accreditation/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/accreditation/",
    req.params.filename
  );
  res.sendFile(filePath);
});

export default router;
