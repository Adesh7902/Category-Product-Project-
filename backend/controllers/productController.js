import Product from "../models/Product.model.js";

const getProducts = async (req, res) => {
  const { page = 1, pageSize = 10, category_id } = req.query;
  const offset = (page - 1) * pageSize;
  const whereClause = category_id ? { category_id } : {};

  try {
    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / pageSize),
      currentPage: parseInt(page),
      products: products.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Product Id is required" });
  }
  try {
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getProductsByCategoryId = async (req, res) => {
//   const { category_id } = req.params;
//   if (!category_id) {
//     return res.status(400).json({ error: "Category Id is required" });
//   }
//   try {
//     const products = await Product.findAll({ where: { category_id } });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const addProduct = async (req, res) => {
  const { name, description, price, category_id } = req.body;

  if (!name || !description || !price || !category_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
      category_id,
    });
    res.status(201).json({
      id: product.id,
      name,
      description,
      price,
      category_id,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Product Id is required" });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.update(
      {
        name: name !== undefined ? name : product.name,
        description:
          description !== undefined ? description : product.description,
        price: price !== undefined ? price : product.price,
        category_id:
          category_id !== undefined ? category_id : product.category_id,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Product Id is required" });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getProducts,
  getProductsById,
  // getProductsByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
};
