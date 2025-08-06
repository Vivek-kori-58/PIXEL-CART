import React, { useState } from "react";
import axios from "axios";

const AddHome = () => {
  const [formData, setFormData] = useState({
    houseName: "",
    price: "",
    location: "",
    rating: "",
    description: "",
    photo: null, // file object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("houseName", formData.houseName);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("rating", formData.rating);
    data.append("description", formData.description);
    data.append("photo", formData.photo); // file

    try {
      const res = await axios.post(
        "http://localhost:3001/host/add-home",
        data,
        {
          withCredentials: true, // if session/auth is required
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Home added successfully!");
        // Optionally reset form or redirect
        setFormData({
          houseName: "",
          price: "",
          location: "",
          rating: "",
          description: "",
          photo: null,
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Register Your Home on AirBnB
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          name="houseName"
          placeholder="Enter your House Name"
          value={formData.houseName}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price Per Night"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        />
      </form>
    </main>
  );
};

export default AddHome;