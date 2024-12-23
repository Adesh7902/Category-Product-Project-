import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Product from "./Product.jsx";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const url = "http://localhost:8081";

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`);
      setCategories(response.data);
    } catch (error) {
      setError("Failed to fetch categories");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      if (!name || !description) {
        return setError("All fields are required");
      }
      const newCategory = { name, description };
      await axios.post(`${url}/api/category/add`, newCategory);
      fetchCategories();
      setName("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      setError("Failed to add category");
      console.error(error);
    }
  };

  const updateCategory = async (id) => {
    try {
      const updatedCategory = { name, description };
      await axios.put(`${url}/api/category/update/${id}`, updatedCategory);
      fetchCategories();
      setEditingCategoryId(null);
    } catch (error) {
      setError("Failed to update category");
      console.error(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${url}/api/category/delete/${id}`);
      fetchCategories();
    } catch (error) {
      setError("Failed to delete category");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>
      {showForm && (
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={addCategory}
            >
              Add Category
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded p-4 flex justify-between items-center"
          >
            {editingCategoryId === category.id ? (
              <div className="flex flex-col w-full">
                <input
                  className="border p-2 mb-2 w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="border p-2 mb-2 w-full"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded self-end"
                    onClick={() => updateCategory(category.id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded self-end"
                    onClick={() => setEditingCategoryId(null)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => {
                      setEditingCategoryId(category.id);
                      setName(category.name);
                      setDescription(category.description);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedCategory && <Product category={selectedCategory} />}
    </div>
  );
};

export default Category;
