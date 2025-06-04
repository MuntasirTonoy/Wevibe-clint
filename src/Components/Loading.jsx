import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Lottie animationData={loadingAnimation} loop={true} className="w-52" />
    </div>
  );
};

export default Loading;
