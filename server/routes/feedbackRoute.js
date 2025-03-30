import express from "express";
import db from "../data/database.js";
import multer from "multer";
import path from "path";
import dayjs from "dayjs";
import fs from "fs";

const router = express.Router();
const __dirname = import.meta.dirname;
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

router.get("/get-info/:id", async function (req, res) {
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

router.get("/get-feedback/", async function (req, res) {
  const query = `
    SELECT 
      mqa_feedback.*,
      maklumat_program.nama_program,
      accreditation_application.application_type
    FROM 
      mqa_feedback
    INNER JOIN 
      accreditation_application ON mqa_feedback.application_id = accreditation_application.id
    INNER JOIN
      maklumat_program ON accreditation_application.program_id = maklumat_program.id
  `;
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    res.status(500).send("Server error");
  }
});

router.get("/get-application-info/:id", async function (req, res) {
  const id = req.params.id;
  const query = `
    SELECT 
      maklumat_program.nama_program,
      accreditation_application.application_type,
      accreditation_application.application_status,
      mqa_feedback.*
    FROM 
      maklumat_program
    INNER JOIN 
      accreditation_application ON maklumat_program.id = accreditation_application.program_id
    INNER JOIN
      mqa_feedback ON accreditation_application.id = mqa_feedback.application_id
    WHERE 
      accreditation_application.id = ${id}
  `;

  try {
    const [result] = await db.query(query);
    res.json(result);
    // console.table(result);
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

router.put(
  "/maklumbalas-mqa/:id/edit",
  upload.single("feedback_documents_path"),
  async function (req, res) {
    const relativeFilePath = req.file
      ? `/uploads/mqaFeedback/${req.file.filename}`
      : req.body.existingFeedback_path;

    if (req.file && req.body.existingFeedback_path) {
      const oldFilePath = path.join(
        __dirname,
        "..",
        req.body.existingFeedback_path
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
      req.body.comment,
      req.body.is_fined,
      dayjs(req.body.feedback_date).format("YYYY-MM-DD"),
      req.params.id,
    ];
    const query = `
       UPDATE mqa_feedback
       SET 
        feedback_documents_path = ?,
        comment = ?,
        is_fined = ?,
        feedback_date = ?
      WHERE application_id = ?`;
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

router.delete("/maklumbalas-mqa/:id/delete", async function (req, res) {
  const query = "DELETE FROM mqa_feedback WHERE application_id = ?";
  try {
    await db.query(query, req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting feedback");
  }
});

router.get("/uploads/mqaFeedback/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/mqaFeedback/",
    req.params.filename
  );
  res.sendFile(filePath);
});

export default router;
