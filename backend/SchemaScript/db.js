import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log("Connected to the MySQL database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error.message);
    throw error;
  }
};
