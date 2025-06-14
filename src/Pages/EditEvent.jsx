import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
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

  const [title, setTitle] = useState(eventData.title || "");
  const [description, setDescription] = useState(eventData.description || "");
  const [eventType, setEventType] = useState(eventData.eventType || "");
  const [imageUrl, setImageUrl] = useState(eventData.imageUrl || "");
  const [location, setLocation] = useState(eventData.location || "");
  const [eventDate, setEventDate] = useState(
    eventData.eventDate ? new Date(eventData.eventDate) : new Date()
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      description,
      eventType,
      imageUrl,
      location,
      eventDate,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/events/${eventData._id}`,
        updatedEvent
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
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Edit Event
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHeading className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter event title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaFileAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="description"
                      rows={4}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Describe your event"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <label
                    htmlFor="event-type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Type *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTags className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="event-type"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
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
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="image-url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Thumbnail Image URL *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="image-url"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter event location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="w-full">
                      <DatePicker
                        id="event-date"
                        selected={eventDate}
                        onChange={(date) => setEventDate(date)}
                        minDate={tomorrow}
                        placeholderText="Select event date"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button className="btn w-full" type="submit">
                    Update Event
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
