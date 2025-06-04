import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
