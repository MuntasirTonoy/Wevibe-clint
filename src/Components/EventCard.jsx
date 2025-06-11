import React from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";

const EventCard = ({
  id,
  title,
  description,
  imageUrl,
  eventType,
  location,
  date,
}) => {
  return (
    <div className="bg-base-300 rounded-lg border-1 border-gray-500/20 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-grow">
        {/* Event Type Badge */}
        <div className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-teal-600 bg-indigo-100 rounded-full">
          <div className="flex items-center">
            <FaTag className="h-3 w-3 mr-1" />
            {eventType}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 text-text-color line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="  text-sm mb-4 line-clamp-2">{description}</p>

        {/* Date */}
        <div className="flex items-center  text-sm mb-2">
          <FaCalendarAlt className="h-4 w-4 mr-2" />
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Location */}
        <div className="flex items-center  text-sm">
          <FaMapMarkerAlt className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>

      {/* Button Section */}
      <div className="px-4 pb-4">
        <Link to="/event-details" className="block w-full">
          <button className="btn bg-teal-700 text-white w-full">
            View Event
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
