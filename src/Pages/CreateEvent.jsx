import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import swal from "sweetalert2";
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Healthcare",
    "Animal Welfare",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newEvent = {
      title,
      description,
      eventType,
      imageUrl,
      location,
      eventDate,
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
        swal.fire({
          icon: "success",
          title: "Event created successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Invalidate userEvents query so ManageEvents refetches
        queryClient.invalidateQueries(["userEvents", user?.email]);

        navigate("/manage-events");
      }
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Failed to create event",
        text: "Please try again later.",
      });
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Create New Event</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    Event Title *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHeading className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter event title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Description *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaFileAlt className="h-5 w-5" />
                    </div>
                    <textarea
                      id="description"
                      rows={4}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Describe your event"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="event-type"
                    className="block text-sm font-medium mb-1"
                  >
                    Event Type *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTags className="h-5 w-5" />
                    </div>
                    <select
                      id="event-type"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                <div>
                  <label
                    htmlFor="image-url"
                    className="block text-sm font-medium mb-1"
                  >
                    Thumbnail Image URL *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="h-5 w-5" />
                    </div>
                    <input
                      type="url"
                      id="image-url"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-sm font-medium mb-1"
                  >
                    Event Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <FaCalendarAlt className="h-5 w-5" />
                    </div>
                    <div className="w-full">
                      <DatePicker
                        id="event-date"
                        selected={eventDate}
                        onChange={(date) => setEventDate(date)}
                        minDate={
                          new Date(new Date().setDate(new Date().getDate() + 1))
                        }
                        placeholderText="Select event date"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    className={`btn w-full ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating Event..." : "Create Event"}
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
