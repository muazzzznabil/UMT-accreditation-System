import cron from "node-cron";
import db from "../data/database.js";
import nodemailer from "nodemailer";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

// Configure transporter using .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NOTIFY_EMAIL_USER,
    pass: process.env.NOTIFY_EMAIL_PASS,
  },
});

// Run every day at 8am
cron.schedule("0 16 2 * * *", async () => {
  const threeMonthsFromNow = dayjs().add(3, "month").format("YYYY-MM-DD");
  console.log("Scheduled ...", dayjs(threeMonthsFromNow).format("YYYY-MM-DD"));

  try {
    // 1. Get all programs ending in 3 months
    const [programs] = await db.query(
      `SELECT * FROM maklumat_program WHERE program_end_date = ?`,
      [threeMonthsFromNow]
    );
    if (programs.length === 0) return;
    if (programs.length === 0) {
      console.log("No programs ending in 3 months.");
      return;
    }
    if (programs.length !== 0) {
      console.log("Programs ending in 3 months:", programs);
    }

    // 2. Get all user emails
    const [users] = await db.query(
      `SELECT email FROM user WHERE email IS NOT NULL AND email != ''`
    );
    const allEmails = users.map((u) => u.email).filter(Boolean);

    // 3. Send notification for each program to all users
    for (const program of programs) {
      if (allEmails.length > 0) {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 24px; border-radius: 8px;">
            <h2 style="color: #2563eb;">Program End Date Notification</h2>
            <p style="font-size: 16px; color: #111827;">Program <b>"${
              program.nama_program
            }"</b> will end in 3 months on <b>${dayjs(
          program.program_end_date
        ).format("DD/MM/YYYY")}</b>.</p>
            <a href="http://localhost:5173/" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Accreditation Website</a>
          </div>
        `;
        await transporter.sendMail({
          from: process.env.NOTIFY_EMAIL_USER,
          to: allEmails,
          subject: `Program End Date Notification: ${program.nama_program}`,
          text: `Program "${
            program.nama_program
          }" will end in 3 months on ${dayjs(program.program_end_date).format(
            "DD/MM/YYYY"
          )}. Visit https://accreditation.umt.edu.my`,
          html: htmlContent,
        });
        console.log(
          `Notification sent to all users for program ${program.nama_program}`
        );
      }
    }
  } catch (err) {
    console.error("Error in scheduled notification:", err);
  }
});
