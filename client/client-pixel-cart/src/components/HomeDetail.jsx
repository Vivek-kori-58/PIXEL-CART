// HomeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const HomeDetails = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/homes/${id}`);
        setHome(res.data.home);
      } catch (error) {
        console.error("Error fetching home details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [id]);

  if (loading) return <Loading />;
  if (!home) return <p>Home not found</p>;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 m-2.5">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">
          <img
            src={`http://localhost:3001/${home.photo.replace(/\\/g, "/")}`}
            alt={home.houseName}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-800 m-2">{home.houseName}</h2>
          <p className="text-gray-600 m-2">Location: {home.location}</p>
          <p className="text-gray-600 m-2">Price: ₹{home.price}/night</p>
          <p className="text-gray-600 m-2">Rating: {home.rating}⭐</p>
          <p className="m-2">{home.description}</p>
        </div>
      </div>
    </>
  );
};

export default HomeDetails;
