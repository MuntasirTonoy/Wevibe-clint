import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

import { useForm, Controller } from "react-hook-form";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTags,
  FaFileAlt,
  FaHeading,
  FaImage,
} from "react-icons/fa";

const EditEvent = () => {
  const eventData = useLoaderData();
  const navigate = useNavigate();

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
      title: eventData.title || "",
      description: eventData.description || "",
      eventType: eventData.eventType || "",
      imageUrl: eventData.imageUrl || "",
      location: eventData.location || "",
      eventDate: eventData.eventDate ? new Date(eventData.eventDate) : null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/events/${eventData._id}`,
        data
      );

      if (response.data.modifiedCount > 0 || response.data.acknowledged) {
        Swal.fire("Success!", "Event updated successfully.", "success");
        navigate("/manage-events");
      } else {
        Swal.fire("No Changes", "No changes were made to the event.", "info");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire("Error", "Failed to update the event.", "error");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-base-300 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-base-content mb-6">
              Edit Event
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
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100     placeholder-gray-500 focus:outline-none focus:ring-teal-600focus:border-teal-500  sm:text-sm ${
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
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100    placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500  sm:text-sm ${
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
                      <FaTags className="h-5 w-5 text-base-content   " />
                    </div>
                    <select
                      id="eventType"
                      {...register("eventType", {
                        required: "Please select an event type",
                      })}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100    focus:outline-none focus:ring-teal-600 focus:border-teal-500  sm:text-sm ${
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
                      <FaImage className="h-5 w-5 text-base-content   " />
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
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100    placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500  sm:text-sm ${
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
                      <FaMapMarkerAlt className="h-5 w-5 text-base-content   " />
                    </div>
                    <input
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      type="text"
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100    placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500  sm:text-sm ${
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
                      <FaCalendarAlt className="h-5 w-5 text-base-content   " />
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
                          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-base-100  placeholder-gray-500 focus:outline-none focus:ring-teal-600 focus:border-teal-500  sm:text-sm ${
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
                    className="btn w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Event"}
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

export default EditEvent;
