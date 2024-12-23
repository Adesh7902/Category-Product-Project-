import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../sequelize.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

export default Category;

// Notes:
// The Category model defines the structure of the categories table in the database.
// It includes fields for the category id, name, and description.
// The id field is an auto-incrementing integer that serves as the primary key for the table.
// The name field is a string that stores the name of the category, and the description field
// is a text field that stores a description of the category.
// The timestamps option is set to true, which tells Sequelize to automatically add createdAt
// and updatedAt fields to the table to track when records are created and updated.
