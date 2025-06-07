import express from "express";
import db from "../data/database.js";

const router = express.Router();

// Insert evaluator (no program_id here)
router.post("/daftar-penilai", async function (req, res) {
  const query = `
    INSERT INTO evaluator (
      evaluator_name, evaluator_email, evaluator_phone, evaluator_faculty,
      evaluator_status, evaluator_field, evaluator_appointment_date, evaluator_end_date,
      evaluator_appointment_period, evaluator_specific_field
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.evaluator_specific_field || null,
  ];

  try {
    const [result] = await db.query(query, values);
    const evaluatorId = result.insertId;
    // If program_id and evaluator_position are provided, insert into evaluator_program
    if (req.body.program_id) {
      await db.query(
        "INSERT INTO evaluator_program (evaluator_id, program_id, evaluator_position) VALUES (?, ?, ?)",
        [evaluatorId, req.body.program_id, req.body.evaluator_position || null]
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Register evaluator General (no program)
router.post("/daftar-penilai/daftar", async function (req, res) {
  const query = `
    INSERT INTO evaluator (
      evaluator_name, evaluator_email, evaluator_phone, evaluator_faculty,
      evaluator_status, evaluator_field, evaluator_appointment_date, evaluator_end_date,
      evaluator_appointment_period, evaluator_specific_field
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.evaluator_specific_field || null,
  ];

  try {
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all evaluators (general, not program-specific)
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

// Get specific evaluator by id
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

// Update evaluator (general info only)
router.put("/penilai/:id/edit", async function (req, res) {
  const query = `
    UPDATE evaluator
    SET evaluator_name = ?, evaluator_email = ?, evaluator_phone = ?, evaluator_faculty = ?,
        evaluator_status = ?, evaluator_field = ?, evaluator_appointment_date = ?, evaluator_end_date = ?,
        evaluator_appointment_period = ?, evaluator_specific_field = ?
    WHERE id = ?
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.evaluator_specific_field || null,
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

// Update evaluator general (same as above, kept for compatibility)
router.put("/penilai/:id/kemaskini", async function (req, res) {
  const query = `
    UPDATE evaluator
    SET evaluator_name = ?, evaluator_email = ?, evaluator_phone = ?, evaluator_faculty = ?,
        evaluator_status = ?, evaluator_field = ?, evaluator_appointment_date = ?, evaluator_end_date = ?,
        evaluator_appointment_period = ?, evaluator_specific_field = ?
    WHERE id = ?
  `;
  const values = [
    req.body.evaluator_name,
    req.body.evaluator_email,
    req.body.evaluator_phone,
    req.body.evaluator_faculty,
    req.body.evaluator_status,
    req.body.evaluator_field,
    req.body.evaluator_appointment_date,
    req.body.evaluator_end_date,
    req.body.evaluator_appointment_period,
    req.body.evaluator_specific_field || null,
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

// Delete evaluator (and all program assignments)
router.delete("/penilai/:id/delete", async function (req, res) {
  try {
    await db.query(
      "DELETE FROM evaluator_program WHERE evaluator_id = ?",
      req.params.id
    );
    await db.query("DELETE FROM evaluator WHERE id = ?", req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete multiple evaluators (and their program assignments)
router.delete("/penilai/delete-multiple", async function (req, res) {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or empty ID list" });
  }
  const placeholders = ids.map(() => "?").join(",");
  try {
    await db.query(
      `DELETE FROM evaluator_program WHERE evaluator_id IN (${placeholders})`,
      ids
    );
    await db.query(`DELETE FROM evaluator WHERE id IN (${placeholders})`, ids);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete evaluators" });
  }
});

// !delete evaluator assignments (only from evaluator_program)
router.delete(
  "/penilai/delete-multiple/evaluator-program",
  async function (req, res) {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or empty ID list" });
    }
    const placeholders = ids.map(() => "?").join(",");
    try {
      await db.query(
        `DELETE FROM evaluator_program WHERE evaluator_id IN (${placeholders})`,
        ids
      );
      // Do NOT delete from evaluator table
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete evaluator assignments" });
    }
  }
);

// Get evaluators for a specific program (with position)
router.get("/penilai/:program_id/program", async function (req, res) {
  const query = `
    SELECT 
      mp.nama_program,
      e.id AS evaluator_id,
      e.evaluator_name,
      e.evaluator_email,
      e.evaluator_phone,
      e.evaluator_faculty,
      e.evaluator_field,
      e.evaluator_status,
      e.evaluator_appointment_date,
      e.evaluator_end_date,
      e.evaluator_appointment_period,
      pe.evaluator_position
    FROM 
      evaluator_program pe
    JOIN 
      evaluator e ON pe.evaluator_id = e.id
    JOIN
      maklumat_program mp ON pe.program_id = mp.id
    WHERE 
      pe.program_id = ?
  `;
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

// Add evaluator to program (insert into evaluator_program)
router.put("/tambah-program-penilai", async function (req, res) {
  const query = `
    INSERT INTO evaluator_program (evaluator_id, program_id, evaluator_position)
    VALUES (?, ?, ?)
  `;
  const values = [
    req.body.evaluator_id,
    req.body.program_id,
    req.body.evaluator_position || null,
  ];

  try {
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Penilai sudah didaftarkan untuk program ini." });
    }
    console.error(error);
    res.status(500).send(error);
  }
});

// Update evaluator position in evaluator_program (for a specific program assignment)
router.put("/penilai/:evaluator_id/edit-position", async function (req, res) {
  const { evaluator_position } = req.body;
  const { evaluator_id } = req.params;
  if (!evaluator_position) {
    return res.status(400).json({ error: "Missing evaluator_position" });
  }
  try {
    // Update all program assignments for this evaluator (or restrict to a program if needed)
    await db.query(
      "UPDATE evaluator_program SET evaluator_position = ? WHERE evaluator_id = ?",
      [evaluator_position, evaluator_id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update evaluator position" });
  }
});

export default router;
