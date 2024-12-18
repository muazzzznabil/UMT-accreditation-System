const express = require("express");
const router = express.Router();
const db = require("../data/database");

//insert data into maklumat program (USE KNEX for auto insert)
router.post("/maklumat-program", async function (req, res) {
  const query = `
  INSERT INTO maklumatProgramTest 
  (nama_program,fakulti)
  VALUES (?)
  `;
  const maklumat = [req.body.nama_program, req.body.fakulti];
  try {
    // const { maklumat } = req.body;
    console.log(maklumat);

    await db.query(query, [maklumat]);
    res.sendStatus(200);
  } catch (error) {
    console.table(req.body);
    console.log(error);
  }
});

//select all from table
router.get("/maklumat-program", async function (req, res) {
  const query = "SELECT * FROM maklumatProgramTest;";
  try {
    const [result] = await db.query(query);
    console.table(result);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

//select specific program
router.get("/maklumat-program/:id", async function (req, res) {
  const query = "SELECT * FROM maklumatProgramTest where id = ?";
  try {
    const [result] = await db.query(query, req.params.id);
    console.table(result);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});
//update table
router.put("/maklumat-program/:id/edit", async function (req, res) {
  const { id } = req.params;
  const { nama_program, fakulti } = req.body;
  const query =
    "UPDATE maklumatProgramTest SET nama_program = ?, fakulti = ? WHERE id = ?";

  try {
    await db.query(query, [nama_program, fakulti, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

//delete
router.delete("/maklumat-program/:id/delete", async function (req, res) {
  const query = `DELETE FROM maklumatProgramTest where id = ?`;
  try {
    await db.query(query, req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
