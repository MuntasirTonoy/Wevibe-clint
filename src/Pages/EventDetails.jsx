import React, { use } from "react";
import {
  PiCalendar,
  PiMapPin,
  PiTagChevron,
  PiArrowLeft,
} from "react-icons/pi";
import { useLoaderData } from "react-router";

const EventDetails = () => {
  const eventData = useLoaderData();

  const {
    _id,
    title,
    description,
    eventType,
    imageUrl,
    location,
    eventDate,
    author,
    createdAt,
  } = eventData;
  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button className="flex items-center   mb-6 transition-colors">
          <PiArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </button>

        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
          <div className="h-64 md:h-96 w-full relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-base-100 rounded-full px-4 py-2 text-sm font-medium text-teal-700 flex items-center shadow-md">
              <PiTagChevron className="h-4 w-4 mr-1" />
              {eventType}
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold  mb-4">{title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <div className="flex items-center  mr-6 mb-2 sm:mb-0">
                <PiCalendar className="h-5 w-5 mr-2" />
                {new Date(eventDate).toLocaleDateString()}
              </div>
              <div className="flex items-center ">
                <PiMapPin className="h-5 w-5 mr-2" />
                {location}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium  mb-3">Description</h3>
              <p className=" leading-relaxed">{description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-medium  mb-1">Organized by:</h3>
                  <p>{author}</p>
                  Event created on:{" "}
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors cursor-pointer">
                    Join Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
