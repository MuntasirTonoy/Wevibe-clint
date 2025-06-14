import React from "react";
import Hero from "../Components/Hero";
import Feature from "../Components/Feature";
import FeaturedEvents from "../Components/FeaturedEvent";
import Gallery from "../Components/Gallery";
import NewsLetter from "../Components/NewsLetter";
import Accordian from "../Components/Accordian";

const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <FeaturedEvents />
      <Gallery />
      <Accordian />
      <NewsLetter />
    </div>
  );
};

export default Home;
