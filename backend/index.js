import express from "express";
import cors from "cors";
import sequelize from "./sequelize.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection using Sequelize as ORM
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables fetched!");
});

// API endpoints
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hi from express server");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
