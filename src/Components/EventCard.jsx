import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  if (!event) return null;
  const {
    _id,
    title,
    imageUrl,
    eventDate,
    location,
    eventType = "General",
  } = event;

  return (
    <div className="bg-base-200 rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />

      <div className="p-6">
        {/* Event Type Badge */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700 mb-3">
          {eventType}
        </span>

        {/* Title */}
        <h2 className="text-xl font-semibold  mb-2">{title}</h2>

        {/* Date and Location */}
        <div className="flex items-center  text-sm mb-2">
          <FaCalendarAlt className="mr-2" />
          {new Date(eventDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center  text-sm mb-4">
          <FaMapMarkerAlt className="mr-2" />
          {location}
        </div>

        {/* View Button */}
        <Link to={`/event/${event._id}`}>
          <button className="w-full bg-teal-600 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition">
            View Event
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
