import React from "react";
import Hero from "../Components/Hero";
import Feature from "../Components/Feature";
import FeaturedEvents from "../Components/FeaturedEvent";
import Gallery from "../Components/Gallery";

const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <FeaturedEvents />
      <Gallery />
    </div>
  );
};

export default Home;
