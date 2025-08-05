import React from "react";

const AddHome = () => {
  return (
    <>
      <main className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register Your Home on AirBnB
        </h1>
        <form
          action="/host/add-home"
          method="POST"
          className="max-w-md mx-auto"
        >
          <input
            type="text"
            name="houseName"
            placeholder="Enter your House Name"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="price"
            placeholder="Price Per Night"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="photo"
            placeholder="Enter Photo URL"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          />
        </form>
      </main>
    </>
  );
};

export default AddHome;
