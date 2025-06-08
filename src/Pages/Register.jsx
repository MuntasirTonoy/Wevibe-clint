import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import animationData from "../assets/register-lottie.json";
import { Link, useNavigate } from "react-router"; // Updated from react-router
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { BsGoogle } from "react-icons/bs";

const Register = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile } =
    useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.photoURL.trim()) {
      newErrors.photoURL = "Photo URL is required";
    } else {
      try {
        new URL(formData.photoURL);
      } catch {
        newErrors.photoURL = "Invalid photo URL";
      }
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, type = "success") => {
    Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return showToast("Please correct the errors", "error");
    }

    setLoading(true);
    try {
      await createUser(
        formData.email,
        formData.password,
        formData.name,
        formData.photoURL
      );
      await updateUserProfile(formData.name, formData.photoURL);
      showToast("Registration successful!");
      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      showToast(error.message || "Registration failed", "error");
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      showToast("Signed in with Google!");
      navigate("/");
    } catch (error) {
      showToast(error.message || "Google Sign-In failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Lottie */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-80 h-80 mx-auto mb-8 bg-white rounded-full flex items-center justify-center backdrop-blur-sm">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{
                background: "transparent",
                width: "300px",
                height: "300px",
              }}
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Join Us Today</h1>
          <p className="text-xl text-teal-100">
            Create your account and start your journey
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                type="url"
                value={formData.photoURL}
                onChange={(e) => handleInputChange("photoURL", e.target.value)}
                className={`w-full p-3 border rounded-lg ${
                  errors.photoURL ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter photo URL"
              />
              {errors.photoURL && (
                <p className="text-sm text-red-600 mt-1">{errors.photoURL}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full p-3 pr-12 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Register */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600 font-medium">
                Login here
              </Link>
            </p>
          </div>

          {/* Google Sign-in */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 hover:bg-gray-100"
            >
              <BsGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
