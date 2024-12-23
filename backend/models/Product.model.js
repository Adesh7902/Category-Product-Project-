import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category.model.js";

const Product = sequelize.define(
  "Product",
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
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

Product.belongsTo(Category, { foreignKey: "category_id" });

export default Product;
