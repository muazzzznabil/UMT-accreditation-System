const express = require("express");
const router = express.Router();
const db = require("../data/database");
const multer = require("multer");
const path = require("path");
const dayjs = require("dayjs");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/mqafeedback/"));
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

router.get("/get-application-info/:id", async function (req, res) {
  const id = req.params.id;
  const query = `
    SELECT maklumat_program.nama_program,accreditation_application.application_type,accreditation_application.application_status
    FROM maklumat_program
    INNER JOIN accreditation_application ON maklumat_program.id = accreditation_application.program_id
    WHERE accreditation_application.id = ${id}
  `;
  try {
    const [result] = await db.query(query);
    res.json(result);
    console.table(result);
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(500).send("Server error");
  }
});

router.get("/semak-maklumbalas", async function (req, res) {
  const query = `
    SELECT application_id, id AS feedback_id
    FROM mqa_feedback
  `;
  try {
    const [result] = await db.query(query);
    res.json(result); // Return all feedback data
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(500).send("Server error");
  }
});

router.post(
  "/maklumbalas-mqa",
  upload.single("feedback_documents_path"),
  async function (req, res) {
    if (!req.file) {
      return res.status(408).send("No file uploaded");
    }
    const relativeFilePath = `/uploads/mqaFeedback/${req.file.filename}`;
    const data = [
      req.body.program_id,
      req.body.application_id,
      relativeFilePath,
      req.body.comment,
      dayjs(req.body.feedback_date).format("YYYY-MM-DD"),
      req.body.is_fined,
    ];
    const query = `
         INSERT INTO mqa_feedback (
          program_id,
          application_id,
          feedback_documents_path,
          comment,
          feedback_date,
          is_fined	
        ) VALUES (?, ?, ?, ?, ?, ?)`;
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

module.exports = router;
