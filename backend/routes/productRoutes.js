import express from "express";

import {
  addProduct,
  getProducts,
  getProductsById,
  // getProductsByCategoryId,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/list", getProducts);

productRouter.get("/list/:id", getProductsById);

// productRouter.get("/list/category/:category_id", getProductsByCategoryId);

productRouter.post("/add", addProduct);

productRouter.put("/update/:id", updateProduct);

productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
