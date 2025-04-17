import mysql from "mysql2/promise";
import { config } from "dotenv";
// import { Sequelize } from "sequelize";
config();

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

export default pool;
