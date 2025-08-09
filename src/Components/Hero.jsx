import Lottie from "lottie-react";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";
import animationData from "../assets/hero-loottie.json";

const Hero = () => {
  return (
    <div className="hero py-10 bg-base-200  lg:min-h-screen">
      <div className="hero-content gap-5 lg:gap-20 flex-col lg:flex-row-reverse">
        <Fade direction="right" distance="100px">
          <Lottie animationData={animationData} loop autoplay />
        </Fade>
        <div className="lg:w-1/2 w-full px-5">
          <Fade direction="left" distance="100px">
            <h1 className="text-3xl lg:text-5xl lg:text-start text-center  font-bold">
              Make a difference in your community
            </h1>
            <p className="py-6 lg:text-start text-center">
              Join thousands of volunteers organizing and participating in
              social service events that matter. Find opportunities to give back
              in your local area..
            </p>
            <div className="flex gap-2 lg:flex-row flex-col justify-center lg:justify-start">
              <Link
                to="/upcoming-events"
                className="btn bg-teal-600  text-white hover:bg-teal-700 font-semibold py-2 rounded-md transition cursor-pointer"
              >
                Find Event
              </Link>
              <Link
                to="/create-event"
                className="btn bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition cursor-pointer "
              >
                Create Event
              </Link>
            </div>
          </Fade>
        </div>
      </div>{" "}
    </div>
  );
};

export default Hero;
