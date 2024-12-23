import Category from "../models/Category.model.js";

const getCategory = async (req, res) => {
  try {
    const rows = await Category.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await Category.create({ name, description });
    res
      .status(201)
      .json(
        { id: result.insertId, name, description },
        { message: "Category added successfully" }
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Category Id is required" });
  }
  try {
    const [updated] = await Category.update(
      { name, description },
      { where: { id } }
    );

    if (updated) {
      const updatedCategory = await Category.findOne({ where: { id } });
      return res.status(200).json({
        id: updatedCategory.id,
        name: updatedCategory.name,
        description: updatedCategory.description,
        message: "Category updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Category Id is required" });
  }
  try {
    await Category.destroy({ where: { id } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCategory, addCategory, updateCategory, deleteCategory };
