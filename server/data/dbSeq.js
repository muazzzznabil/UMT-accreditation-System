import mysql from "mysql2/promise";
import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

export default db;
