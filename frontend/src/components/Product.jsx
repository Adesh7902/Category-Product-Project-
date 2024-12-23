import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPencilAlt,
  FaTrash,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Product = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const url = "http://localhost:8081";
  const category_id = category.id;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/list?category_id=${category_id}&page=${currentPage}`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  useEffect(() => {
    if (category_id) {
      fetchProducts();
    }
  }, [category_id, currentPage]);

  const addProduct = async () => {
    try {
      if (!name || !description || !price || !category_id) {
        return setError("All fields are required");
      }
      const newProduct = { name, description, price, category_id };
      await axios.post(`${url}/api/product/add`, newProduct);
      setName("");
      setDescription("");
      setPrice("");
      setShowForm(false);
    } catch (error) {
      setError("Failed to add product");
      console.error(error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const updatedProduct = { name, description, price, category_id };
      await axios.put(`${url}/api/product/update/${id}`, updatedProduct);
      fetchProducts();
      setEditingProductId(null);
    } catch (error) {
      setError("Failed to update product");
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${url}/api/product/delete/${id}`);
      fetchProducts();
    } catch (error) {
      setError("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
      )}
      <div className="flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Product"}
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
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        )}
        <div className="flex flex-wrap justify-center w-full mt-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-4 m-4 w-80 text-center"
            >
              {editingProductId === product.id ? (
                <div className="flex flex-col w-full">
                  <input
                    className="border p-2 mb-2 w-full"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="border p-2 mb-2 w-full"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                      onClick={() => updateProduct(product.id)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded self-end"
                      onClick={() => setEditingProductId(null)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">Category Id: {category_id}</p>
                  <p className="text-gray-700">
                    Category Name: {category.name}
                  </p>

                  <p className="text-gray-700">Product Id: {product.id}</p>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-green-500">${product.price}</p>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 m-2 rounded"
                    onClick={() => {
                      setEditingProductId(product.id);
                      setName(product.name);
                      setDescription(product.description);
                      setPrice(product.price);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 m-2 rounded"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="px-4 py-2 m-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Product;
