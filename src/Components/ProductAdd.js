import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "./Modal";
import Navbars from "./Navbars";
import Sidebar from "./Sidebar";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const response = await axios.post(
        "https://dummyjson.com/products/add",
        formData
      );

      console.log("Product added successfully:", response.data);
      setProductAdded(true);
      setIsModalOpen(true);
    } catch (err) {
      setError("Error adding product");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductAdded(false);
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Navbars />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 justify-center items-center p-4 mt-12">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-600 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4 "
          >
            <h2 className="text-2xl font-semibold text-center text-white">
              Add Product
            </h2>
            <div>
              <label className="block text-white font-medium">
                Product Name:
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium">Price:</label>
              <input
                type="number"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium">
                Category:
              </label>
              <select
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Tv">Tv</option>
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label className="block text-white font-medium">
                Upload Image:
              </label>
              <input
                type="file"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 outline-none"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={productAdded ? "Success" : "Error"}
        message={productAdded ? "Product Added Successfully!" : error}
      />
    </div>
  );
};

export default ProductAdd;


