import express from "express";
import db from "../data/database.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    // Total number of programs
    const [[{ total_programs }]] = await db.query(
      "SELECT COUNT(id) as total_programs FROM maklumat_program"
    );
    // Total number of approved applications
    const [[{ total_application_approved }]] = await db.query(
      "SELECT COUNT(id) as total_application_approved FROM accreditation_application WHERE application_status = 'approved'"
    );
    // Total number of rejected applications
    const [[{ total_application_rejected }]] = await db.query(
      "SELECT COUNT(id) as total_application_rejected FROM accreditation_application WHERE application_status = 'rejected'"
    );
    // Total number of pending applications
    const [[{ total_application_pending }]] = await db.query(
      "SELECT COUNT(id) as total_application_pending FROM accreditation_application WHERE application_status = 'pending'"
    );

    // Total number of evaluatorsdjvhkbnmvbj
    const [[{ total_evaluators }]] = await db.query(
      "SELECT COUNT(id) as total_evaluators FROM evaluator"
    );
    // Total number of active evaluators
    const [[{ total_evaluators_aktif }]] = await db.query(
      "SELECT COUNT(id) as total_evaluators_aktif FROM evaluator WHERE evaluator_status = 'Aktif'"
    );
    // Total number of inactive evaluators
    const [[{ total_evaluators_tidak_aktif }]] = await db.query(
      "SELECT COUNT(id) as total_evaluators_tidak_aktif FROM evaluator WHERE evaluator_status = 'tidak_aktif'"
    );

    // Total number of active applications
    const [[{ active_applications }]] = await db.query(
      "SELECT COUNT(id) as active_applications FROM accreditation_application WHERE application_status = 'approved'"
    );
    // Total number of active accreditations
    const [[{ active_accreditations }]] = await db.query(
      "SELECT COUNT(accreditation_id) as active_accreditations FROM accreditation WHERE accreditationStatus = 'Active'"
    );

    res.json({
      total_programs,
      total_evaluators,
      active_applications,
      active_accreditations,
      total_application_approved,
      total_application_rejected,
      total_application_pending,
      total_evaluators_aktif,
      total_evaluators_tidak_aktif,
    });
  } catch (err) {
    console.error("DASHBOARD ROUTE ERROR:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch dashboard stats", details: err.message });
  }
});

export default router;
