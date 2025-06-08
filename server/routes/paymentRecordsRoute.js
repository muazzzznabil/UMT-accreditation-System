import express from "express";
import db from "../data/database.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = import.meta.dirname;
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/paymentProof/"));
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

// !Rekod Pembayaran Insert
router.post(
  "/rekod-pembayaran",
  upload.single("payment_proof_path"),
  async function (req, res) {
    if (!req.file) {
      return res.status(405).statusMessage("No file uploaded");
    }
    const relativeFilePath = `/uploads/paymentProof/${req.file.filename}`;
    const data = [
      req.body.program_id,
      dayjs(req.body.payment_date).format("YYYY-MM-DD"),
      req.body.payment_amount,
      relativeFilePath,
      req.body.payment_method,
      req.body.payment_description,
      req.body.payment_type,
      req.body.application_id,
    ];
    const query = `
       INSERT INTO payment (
        program_id,
        payment_date,	
        payment_amount,
        payment_proof_path,
        payment_method,
        payment_description,
        payment_type,
        application_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
    try {
      await db.query(query, data);
      console.log("Success");
      res.status(200).send("File uploaded and data inserted successfully");
    } catch (error) {
      console.error("Error inserting into payment_records:", error);
      console.table(data);
      res.status(500).send("Error inserting into payment_records");
    }
  }
);

// !Update Rekod Pembayaran
router.put(
  "/rekod-pembayaran/:id/edit",
  upload.single("payment_proof_path"),
  async function (req, res) {
    const relativeFilePath = req.file
      ? `/uploads/paymentProof/${req.file.filename}`
      : req.body.existingPayment_proof_path;

    if (req.file && req.body.existingPayment_proof_path) {
      const oldFilePath = path.join(
        __dirname,
        "..",
        req.body.existingPayment_proof_path
      );
      try {
        fs.unlinkSync(oldFilePath);
        console.log("Old file deleted:", oldFilePath);
      } catch (err) {
        console.error("Error deleting old file:", err);
      }
    }

    const data = [
      dayjs(req.body.payment_date).format("YYYY-MM-DD"),
      req.body.payment_amount,
      relativeFilePath,
      req.body.payment_method,
      req.body.payment_description,
      req.body.payment_type,
      req.params.id,
    ];
    const query = `
       UPDATE payment
       SET 
        payment_date = ?,
        payment_amount = ?,
        payment_proof_path = ?,
        payment_method = ?,
        payment_description = ?,
        payment_type = ?
      WHERE id = ?`;
    try {
      await db.query(query, data);
      console.log("Success");
      res.status(200).send("File uploaded and data updated successfully");
    } catch (error) {
      console.error("Error updating into payment_records:", error);
      console.table(data);
      res.status(500).send("Error updating into payment_records");
    }
  }
);

// !Rekod Pembayaran based on program_id
router.get("/senarai-rekod-pembayaran/:program_id", async function (req, res) {
  const query = "SELECT * FROM payment WHERE program_id = ?";
  try {
    const [result] = await db.query(query, [req.params.program_id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching payment records:", error);
    res.status(500).send("Server error");
  }
});

// !Rekod Pembayaran based on payment_id
router.get("/rekod-pembayaran/:program_id", async function (req, res) {
  const query = "SELECT * FROM payment WHERE id = ?";
  try {
    const [result] = await db.query(query, [req.params.program_id]);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching payment records:", error);
    res.status(500).send("Server error");
  }
});

// !Delete Rekod Pembayaran
router.delete("/rekod-pembayaran/:id/delete", async function (req, res) {
  const query = "DELETE FROM payment WHERE id = ?";
  try {
    await db.query(query, [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting payment record:", error);
    res.status(500).send("Error deleting payment record");
  }
});

// !Get application list based on the program_id and application_status approved or rejected
router.get(
  "/senarai-permohonan-akreditasi/:program_id",
  async function (req, res) {
    const query = `SELECT * FROM accreditation_application WHERE program_id = ? AND application_status IN ('approved', 'rejected')`;
    try {
      const [result] = await db.query(query, [req.params.program_id]);

      if (result.length === 0) {
        return res.status(408).send("Data not found");
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching application records:", error);
      res.status(500).send("Server error");
    }
  }
);

router.get("/uploads/paymentProof/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads/paymentProof/",
    req.params.filename
  );
  res.sendFile(filePath);
});

export default router;
