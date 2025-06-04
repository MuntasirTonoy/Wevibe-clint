import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
