const express = require("express");
const cors = require("cors");
const pool = require("./data/database");
const app = express();
const msaFormsRoutes = require("./routes/MSAForms");
const path = require("path");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//Routes
app.use("/pendaftaran-program", msaFormsRoutes);
app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "/uploads/documents"))
);
