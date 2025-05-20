import express from "express";
import db from "../data/database.js";

const router = express.Router();

//insert into table
router.post("/daftar-penilai", async function (req, res) {
  const query = `
    INSERT INTO evaluator (evaluator_name, evaluator_email, evaluator_phone, evaluator_faculty, evaluator_position, evaluator_status, evaluator_field, evaluator_appointment_date, evaluator_end_date, evaluator_appointment_period, program_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_position,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.program_id,
  ];

  try {
    const response = await db.query(query, values);
    console.table(values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// !Register evaluator General
router.post("/daftar-penilai/daftar", async function (req, res) {
  const query = `
    INSERT INTO evaluator (evaluator_name, evaluator_email, evaluator_phone, evaluator_faculty, evaluator_position, evaluator_status, evaluator_field, evaluator_appointment_date, evaluator_end_date, evaluator_appointment_period, evaluator_specific_field)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_position,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.evaluator_specific,
  ];

  try {
    const response = await db.query(query, values);
    console.table(values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//get all evaluator
router.get("/semua-penilai", async function (req, res) {
  const query = "SELECT * FROM evaluator";
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//get specific evaluator
router.get("/penilai/:id", async function (req, res) {
  const query = "SELECT * FROM evaluator WHERE id = ?";
  try {
    const [result] = await db.query(query, req.params.id);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//update evaluator
router.put("/penilai/:id/edit", async function (req, res) {
  const query = `
    UPDATE evaluator
    SET evaluator_name = ?, evaluator_email = ?, evaluator_phone = ?, evaluator_faculty = ?, evaluator_position = ?, evaluator_status = ?, evaluator_field = ?, evaluator_appointment_date = ?, evaluator_end_date = ?, evaluator_appointment_period = ?
    WHERE id = ?
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_position,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.program_id,
    req.params.id,
  ];

  try {
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// !update evaluator general
router.put("/penilai/:id/kemaskini", async function (req, res) {
  const query = `
    UPDATE evaluator
    SET evaluator_name = ?, 
    evaluator_email = ?, 
    evaluator_phone = ?, 
    evaluator_faculty = ?, 
    evaluator_position = ?, 
    evaluator_status = ?, 
    evaluator_field = ?, 
    evaluator_appointment_date = ?, 
    evaluator_end_date = ?, 
    evaluator_appointment_period = ?, 
    evaluator_specific_field = ?
    WHERE id = ?
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_position,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    // req.body.program_id,
    req.body.evaluator_specific,
    req.params.id,
  ];

  try {
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//delete evaluator
router.delete("/penilai/:id/delete", async function (req, res) {
  const query = "DELETE FROM evaluator WHERE id = ?";
  try {
    await db.query(query, req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});
//delete multiple evaluator
router.delete("/penilai/delete-multiple", async function (req, res) {
  const { ids } = req.body; // Expecting an array of IDs

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or empty ID list" });
  }

  const placeholders = ids.map(() => "?").join(","); // Create (?, ?, ?...) dynamically
  const query = `DELETE FROM evaluator WHERE id IN (${placeholders})`;

  try {
    await db.query(query, ids);
    res.sendStatus(200);
    console.log("Success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fadiled to delete evaluators" });
  }
});
//select evaluator based on program id
router.get("/penilai/:program_id/program", async function (req, res) {
  const query = "SELECT * FROM evaluator WHERE program_id = ?";
  try {
    const [result] = await db.query(query, req.params.program_id);
    if (result.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
