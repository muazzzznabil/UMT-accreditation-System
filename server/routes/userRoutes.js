import express from "express";
import db from "../data/database.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dayjs from "dayjs";
import fs from "fs";
import { getUsers, Login, Logout, Register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// ** LOGIN USER ** //

// ! Login user
router.post("/login", async function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const query = `SELECT password FROM user WHERE username = ?`;
  const user = [req.body.username];
  try {
    const [response] = await db.query(query, user);
    if (response.length > 0) {
      const hashedPassword = response[0].password;
      const isValidPassword = bcrypt.compareSync(
        req.body.password,
        hashedPassword
      );
      if (isValidPassword) {
        res.status(200).json({ message: "Login successful" });
        console.log("Login successful");
        return;
      }
    }
    res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ! Login user with sequelize
router.post("/Login-user", Login);

// ! Get user by ID with sequelize
router.get("/users", verifyToken, getUsers);

// ! Refresh Token
router.get("/token", refreshToken);

//  ! Logout
router.delete("/logout", Logout);

// ** REGISTER USER ** //

// ! Create new user
router.post("/add-user", async function (req, res) {
  const query = `INSERT INTO user (username, password, email, phone_number, role , user_status) VALUES (  ?, ?, ?, ? , ?,?)  `;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = [
    req.body.username,
    hashedPassword,
    req.body.email,
    req.body.phone_number,
    req.body.role,
    "pending",
  ];
  try {
    const response = await db.query(query, values);
    console.table(values);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ! Create new user with sequelize
router.post("/register", Register);

// ** USER MANAGEMENT ** //
// ! Get all users with view
router.get("/get-all-users", async function (req, res) {
  const query = `SELECT * FROM user_info`;
  try {
    const [response] = await db.query(query);
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ! Get user by ID with view
router.get("/get-user/:id", async function (req, res) {
  const query = `SELECT * FROM user_info WHERE id = ?`;
  try {
    const [response] = await db.query(query, [req.params.id]);
    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ! Delete user by ID
router.delete("/delete-user/:id", async function (req, res) {
  const query = `DELETE FROM user WHERE id = ?`;
  try {
    const [response] = await db.query(query, [req.params.id]);
    if (response.affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ! Update user by ID
router.put("/update-user/:id", async function (req, res) {
  const query = `UPDATE user SET username = ?, password = ?, email = ?, phone_number = ? WHERE id = ?`;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const values = [
    req.body.username,
    hashedPassword,
    req.body.email,
    req.body.phone_number,
    req.params.id,
  ];
  try {
    const [response] = await db.query(query, values);
    if (response.affectedRows > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
    console.table(values);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
