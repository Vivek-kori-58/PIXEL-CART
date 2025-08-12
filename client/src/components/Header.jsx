import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Loading from "./Loading";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, userType } = useAuth();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ for mobile toggle
  const navigate = useNavigate();

  const HandleLogOut = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/logout", null, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <header className="bg-blue-500 text-white">
      <div className="flex items-center justify-between p-4">
        <NavLink to="/" className="text-xl font-bold">
          PIXEL-CART
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          {isLoggedIn && userType === "guest" && (
            <>
              <NavLink
                to="/home-list"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                HOME LIST
              </NavLink>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                FAVOURITES
              </NavLink>
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                BOOKING
              </NavLink>
            </>
          )}

          {isLoggedIn && userType === "host" && (
            <>
              <NavLink
                to="/add-home"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                ADD HOME
              </NavLink>
              <NavLink
                to="/host-home"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                HOST HOME
              </NavLink>
            </>
          )}
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button
              className="hover:bg-blue-800 text-white rounded p-2"
              onClick={HandleLogOut}
            >
              LOG-OUT
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                LOG-IN
              </NavLink>
              <NavLink
                to="/Signup"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white rounded p-2"
                    : "hover:bg-blue-800 text-white rounded p-2"
                }
              >
                SIGN-UP
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pb-4">
          {isLoggedIn && userType === "guest" && (
            <>
              <NavLink
                to="/home-list"
                className="hover:bg-blue-800 rounded p-2"
              >
                HOME LIST
              </NavLink>
              <NavLink
                to="/favourites"
                className="hover:bg-blue-800 rounded p-2"
              >
                FAVOURITES
              </NavLink>
              <NavLink to="/booking" className="hover:bg-blue-800 rounded p-2">
                BOOKING
              </NavLink>
            </>
          )}

          {isLoggedIn && userType === "host" && (
            <>
              <NavLink to="/add-home" className="hover:bg-blue-800 rounded p-2">
                ADD HOME
              </NavLink>
              <NavLink
                to="/host-home"
                className="hover:bg-blue-800 rounded p-2"
              >
                HOST HOME
              </NavLink>
            </>
          )}

          {isLoggedIn ? (
            <button
              className="hover:bg-blue-800 rounded p-2 text-left"
              onClick={HandleLogOut}
            >
              LOG-OUT
            </button>
          ) : (
            <>
              <NavLink to="/login" className="hover:bg-blue-800 rounded p-2">
                LOG-IN
              </NavLink>
              <NavLink to="/Signup" className="hover:bg-blue-800 rounded p-2">
                SIGN-UP
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
