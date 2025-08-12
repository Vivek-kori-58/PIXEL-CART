import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const Favourites = () => {
  const [FavouritesList, setFavouritesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get("http://localhost:3001/favourites");
        console.log(res.data.favouriteHomes); // <- access the array inside the response
        setFavouritesList(res.data.favouriteHomes);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const HandleRemoveFromFavourites = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/favourites/delete/${id}`, {
        withCredentials: true,
      });
      setFavouritesList(FavouritesList.filter((fav) => fav._id !== id));
      alert("Removed from favourites successfully!");
    } catch (error) {
      console.error("Error removing from favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (FavouritesList.length === 0)
    return (
      <>
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
          No Favourites Found
        </h2>
      </>
    );

  return (
    <>
      <main className="container mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 max-w-6xl">
        <h2 className="text-3xl text-red-500 font-bold text-center mb-6">
          Here are your favourites:
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {FavouritesList.map((Favourite) => {
            return (
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm"
                key={Favourite._id}
              >
                <img
                  src={`http://localhost:3001/${Favourite.photo.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={Favourite.houseName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {Favourite.houseName}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {Favourite.location}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-red-500">
                      Rs
                      {Favourite.price}/ night
                    </span>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{Favourite.rating}</span>
                    </div>
                  </div>

                  <button
                    className="bg-blue-400 rounded p-2"
                    onClick={() => HandleRemoveFromFavourites(Favourite._id)}
                  >
                    Remove From Fav
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Favourites;
