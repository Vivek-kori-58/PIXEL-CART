import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading"; // Assuming you have a Loading component

const AddHome = () => {
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get("editing") === "true";
  const homeId = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    houseName: "",
    price: "",
    location: "",
    rating: "",
    description: "",
    photo: null,
  });

  const handleAddHome = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("houseName", formData.houseName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("description", formData.description);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3001/host/add-home",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      alert("Home added successfully!");
      setLoading(false);
      setFormData({
        houseName: "",
        price: "",
        location: "",
        rating: "",
        description: "",
        photo: null,
      });
    } catch (err) {
      console.error("Add Error:", err);
      alert("Something went wrong");
      return;
    }
  };

  useEffect(() => {
    if (isEditing && homeId) {
      axios
        .get(`http://localhost:3001/host/edit-home/${homeId}?editing=true`, {
          withCredentials: true,
        })
        .then((res) => {
          const home = res.data.home;
          setFormData({
            houseName: home.houseName,
            price: home.price,
            location: home.location,
            rating: home.rating,
            description: home.description,
            photo: null, // User can optionally re-upload photo
          });
        })
        .catch((err) => console.error("Error fetching home:", err));
    }
  }, [isEditing, homeId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log("Editing home ID:", homeId); // must print valid MongoDB ObjectId

    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("id", homeId); // append home ID for editing
    formDataToSend.append("houseName", formData.houseName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("description", formData.description);

    // Only send file if a new one is uploaded
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const res = await axios.post(
        `http://localhost:3001/host/edit-home`, // double check route
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Home updated successfully!");
        setFormData({
          houseName: "",
          price: "",
          location: "",
          rating: "",
          description: "",
          photo: null,
        });
      } else {
        alert("Something went wrong while updating.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <Loading />; // Show loading spinner while processing
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded space-y-4"
    >
      <input
        type="text"
        name="houseName"
        className="w-full border border-gray-300 rounded p-2"
        value={formData.houseName || ""}
        onChange={handleChange}
        placeholder="House Name"
      />
      <input
        type="number"
        name="price"
        className="w-full border border-gray-300 rounded p-2"
        value={formData.price || ""}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="location"
        className="w-full border border-gray-300 rounded p-2"
        value={formData.location || ""}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        type="number"
        name="rating"
        className="w-full border border-gray-300 rounded p-2"
        value={formData.rating || ""}
        onChange={handleChange}
        placeholder="Rating"
      />
      <textarea
        name="description"
        className="w-full border border-gray-300 rounded p-2"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <input
        type="file"
        name="photo"
        onChange={handleChange}
        className="w-full"
      />
      {isEditing ? (
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Home" : "Add Home"}
        </button>
      ) : (
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddHome}
        >
          Add Home
        </button>
      )}
      {/* <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEditing ? "Update Home" : "Add Home"}
      </button> */}
    </form>
  );
};

export default AddHome;
