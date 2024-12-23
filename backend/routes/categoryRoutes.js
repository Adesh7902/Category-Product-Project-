import express from "express";

import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategory);

categoryRouter.post("/add", addCategory);

categoryRouter.put("/update/:id", updateCategory);

categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
