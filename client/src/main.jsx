import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./components/Home.jsx";
import HomeList from "./components/HomeList.jsx";
import Favourites from "./components/Favourites.jsx";
import Booking from "./components/Booking.jsx";
import AddHome from "./components/AddHome.jsx";
import HostHome from "./components/HostHome.jsx";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import { AuthProvider } from "./components/AuthContext.jsx"; 
import HomeDetail from "./components/HomeDetail.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App></App>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home-list",
        element: <HomeList />,
      },{
        path:'/homes/:id',
        element:<HomeDetail/>
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "/favourites/delete/:id",
        element: <Favourites />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/add-home",
        element: <AddHome />,
      },
      {
        path: "/host-home",
        element: <HostHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>

    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </AuthProvider>
  </StrictMode>
);