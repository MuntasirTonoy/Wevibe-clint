import React from "react";
import { BiSolidHome } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import errorAnimation from "../assets/error.json";
import Lottie from "lottie-react";
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Error Code */}
        <div className="mb-6">
          <Lottie
            animationData={errorAnimation}
            loop={true}
            className="w-full max-h-96 mx-auto"
          />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <BsArrowLeft size={18} />
            Go back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full text-teal-500 hover:text-teal-600 py-3 font-medium transition-colors flex rounded-md items-center justify-center gap-2  bg-amber-100"
          >
            <BiSolidHome size={18} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
