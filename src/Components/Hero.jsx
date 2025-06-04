import React from "react";

const Hero = () => {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
        <img
          src="https://plus.unsplash.com/premium_photo-1681965550198-c1c039421905?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="lg:w-1/2 w-full px-5">
          <h1 className="text-2xl lg:text-5xl lg:text-start text-center  font-bold">
            Make a difference in your community
          </h1>
          <p className="py-6 lg:text-start text-center">
            Join thousands of volunteers organizing and participating in social
            service events that matter. Find opportunities to give back in your
            local area..
          </p>
          <div className="flex gap-2 lg:flex-row flex-col justify-center lg:justify-start">
            <button className="btn bg-teal-600  text-white">Find Event</button>
            <button className="btn  bg-teal-600 text-white ">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
