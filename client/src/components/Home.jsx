import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [homeList, setHomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/");
        console.log(res.data.registeredHomes); // <- access the array inside the response
        setHomeList(res.data.registeredHomes);
      } catch (error) {
        console.error("Error fetching homes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  const AddToBooking = async (homeId) => {
    setLoading(true);
    console.log("homeId", homeId);

    try {
      
      const res = await axios.post(
        `http://localhost:3001/booking`,
        { homeId },
        { withCredentials: true }
      );
      console.log(res.data);
      alert("added to booking");
    } catch (error) {
      console.error("Error while adding to home:", error);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex flex-row flex-wrap gap-6 justify-center p-4">
        {Array.isArray(homeList) &&
          homeList.map((home) => (
            <div
              key={home._id}
              className="bg-white shadow-md rounded-lg p-4 max-w-sm"
            >
              <img
                src={`http://localhost:3001/${home.photo.replace(/\\/g, "/")}`}
                alt={home.houseName}
                style={{ width: "350px" }}
              />
              <h2 className="ml-1 mt-1">Name : {home.houseName}</h2>
              <p className="ml-1 mt-1">Location : {home.location}</p>
              <p className="ml-1 mt-1">Price : {home.price}</p>
              <p className="ml-1 mt-1">Rating : {home.rating}</p>
              <p className="ml-1 mt-1">Description : {home.description}</p>
              {/* <input
                type="submit"
                value="BOOK"
                className="hover:bg-blue-800 text-white rounded p-2 bg-blue-500 ml-1 mt-1"
                onClick={() => AddToBooking(home._id)}
              /> */}
              <button
                className="hover:bg-blue-800 text-white rounded p-2 bg-blue-500 ml-1 mt-1"
                onClick={() => AddToBooking(home._id)}
                type="submit"
              >
                Book
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
