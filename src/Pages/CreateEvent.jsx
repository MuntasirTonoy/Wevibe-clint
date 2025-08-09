import React, { useContext } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTags,
  FaFileAlt,
  FaHeading,
  FaImage,
} from "react-icons/fa";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Healthcare",
    "Animal Welfare",
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      eventType: "",
      imageUrl: "",
      location: "",
      eventDate: tomorrow,
    },
  });

  const onSubmit = async (data) => {
    const newEvent = {
      ...data,
      author: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "Anonymous",
      },
      createdAt: new Date(),
      joinedUsers: [],
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/events`,
        newEvent
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Event created successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        queryClient.invalidateQueries(["userEvents", user?.email]);
        navigate("/manage-events");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create event",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-base-300 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-base-content mb-6">
              Create New Event
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Event Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHeading className="h-5 w-5 text-base-content" />
                    </div>
                    <input
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      type="text"
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter event title"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaFileAlt className="h-5 w-5 text-base-content" />
                    </div>
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={4}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Describe your event"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Event Type */}
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Event Type *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTags className="h-5 w-5 text-base-content" />
                    </div>
                    <select
                      id="eventType"
                      {...register("eventType", {
                        required: "Please select an event type",
                      })}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                        errors.eventType ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="" disabled>
                        Select event type
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.eventType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.eventType.message}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Thumbnail Image URL *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="h-5 w-5 text-base-content" />
                    </div>
                    <input
                      id="imageUrl"
                      {...register("imageUrl", {
                        required: "Image URL is required",
                        pattern: {
                          value:
                            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|bmp))$/i,
                          message: "Enter a valid image URL",
                        },
                      })}
                      type="url"
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                        errors.imageUrl ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter image URL"
                    />
                  </div>
                  {errors.imageUrl && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-base-content" />
                    </div>
                    <input
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      type="text"
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter event location"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Event Date */}
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium text-base-content mb-1"
                  >
                    Event Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <FaCalendarAlt className="h-5 w-5 text-base-content" />
                    </div>
                    <Controller
                      control={control}
                      name="eventDate"
                      rules={{ required: "Event date is required" }}
                      render={({ field }) => (
                        <DatePicker
                          id="eventDate"
                          selected={field.value}
                          onChange={field.onChange}
                          minDate={tomorrow}
                          placeholderText="Select event date"
                          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500 sm:text-sm ${
                            errors.eventDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                    />
                  </div>
                  {errors.eventDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.eventDate.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    className={`btn w-full ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Event..." : "Create Event"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
