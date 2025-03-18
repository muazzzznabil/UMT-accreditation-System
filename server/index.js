const express = require("express");
const cors = require("cors");
const pool = require("./data/database");
const app = express();
const msaFormsRoutes = require("./routes/MSAFormsRoute");
const evaluatorRoutes = require("./routes/evaluatorRoute");
const accreditationRoute = require("./routes/rekodAkreditasi");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to handle URL-encoded data

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//Routes MSA Form
app.use("/pendaftaran-program", msaFormsRoutes);

//Routes internal Evaluator
app.use("/penilai-dalaman", evaluatorRoutes);

//Routes accreditation Records
app.use("/rekod-akreditasi", accreditationRoute);

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "/uploads/documents"))
);
app.use(
  "/uploads/accreditation",
  express.static(path.join(__dirname, "/uploads/accreditation"))
);
