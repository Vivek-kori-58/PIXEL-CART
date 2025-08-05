import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-blue-100 flex justify-center p-4 space-x-48">
        <div className="bg-blue-100 flex flex-col items-start p-4 space-y-2">
          <NavLink to="/home-list" className="text-black rounded p-2">
            HOME LIST
          </NavLink>
          <NavLink to="/favourites" className="text-black rounded p-2">
            FAVOURITES
          </NavLink>
          <NavLink to="/booking" className="text-black rounded p-2">
            BOOKING
          </NavLink>
          <NavLink to="/add-home" className="text-black rounded p-2">
            ADD HOME
          </NavLink>
          <NavLink to="/host-home" className="text-black rounded p-2">
            HOST HOME
          </NavLink>
        </div>

        <div className="bg-blue-100 flex flex-col items-start p-4 space-y-2">
          <NavLink to="/home-list" className="text-black rounded p-2">
            HOME LIST
          </NavLink>
          <NavLink to="/favourites" className="text-black rounded p-2">
            FAVOURITES
          </NavLink>
          <NavLink to="/booking" className="text-black rounded p-2">
            BOOKING
          </NavLink>
          <NavLink to="/add-home" className="text-black rounded p-2">
            ADD HOME
          </NavLink>
          <NavLink to="/host-home" className="text-black rounded p-2">
            HOST HOME
          </NavLink>
        </div>

        <div className="bg-blue-100 flex flex-col items-start p-4 space-y-2">
          <NavLink to="/home-list" className="text-black rounded p-2">
            HOME LIST
          </NavLink>
          <NavLink to="/favourites" className="text-black rounded p-2">
            FAVOURITES
          </NavLink>
          <NavLink to="/booking" className="text-black rounded p-2">
            BOOKING
          </NavLink>
          <NavLink to="/add-home" className="text-black rounded p-2">
            ADD HOME
          </NavLink>
          <NavLink to="/host-home" className="text-black rounded p-2">
            HOST HOME
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Footer;
