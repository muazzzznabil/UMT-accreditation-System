import express from "express";
import cors from "cors";
import pool from "./data/database.js";
import msaFormsRoutes from "./routes/MSAFormsRoute.js";
import evaluatorRoutes from "./routes/evaluatorRoute.js";
import accreditationRoute from "./routes/rekodAkreditasi.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import paymentRecordsRoute from "./routes/paymentRecordsRoute.js";
import chatbotGoogle from "./service/googleAi_service.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// import Users from "./models/UserModel.js";
import db from "./data/dbSeq.js";

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_PORT,
  })
);
app.use(express.json());
app.use(express.urlencoxded({ extended: true })); // Add this line to handle URL-encoded data
app.use(cookieParser());

try {
  await db.authenticate();
  console.log("Database connection has been established successfully.");
  // await Users.sync();
} catch (error) {
  console.warn(error);
}

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//!Routes MSA Form
app.use("/pendaftaran-program", msaFormsRoutes);

//!Routes internal Evaluator
app.use("/penilai-dalaman", evaluatorRoutes);

//!Routes accreditation Records
app.use("/rekod-akreditasi", accreditationRoute);

//!Routes feedback
app.use("/mqa-feedback", feedbackRoute);

//!Routes payment records
app.use("/payment-records", paymentRecordsRoute);

//!Routes user management
app.use("/user", userRoutes);

//!Routes for Gemini API
app.use("/chatbot-google", chatbotGoogle);

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "/uploads/documents"))
);
app.use(
  "/uploads/accreditation",
  express.static(path.join(__dirname, "/uploads/accreditation"))
);
app.use(
  "/uploads/mqaFeedback",
  express.static(path.join(__dirname, "/uploads/mqaFeedback"))
);
app.use(
  "/uploads/paymentProof",
  express.static(path.join(__dirname, "/uploads/paymentProof"))
);
