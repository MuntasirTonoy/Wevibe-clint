import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    Swal.fire({
      icon: "error",
      title: "You need to Login first",
      showConfirmButton: false,
      timer: 2000,
    });
    return <Navigate state={location.pathname} to="/login" />;
  }
};

export default PrivateRoute;
