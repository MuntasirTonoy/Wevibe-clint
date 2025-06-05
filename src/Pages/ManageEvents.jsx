import React from "react";
import {
  PiPlus,
  PiTagChevron,
  PiCalendar,
  PiMapPin,
  PiPencil,
  PiTrash,
} from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router"; // Fixed import (react-router-dom instead of react-router)

const ManageEvents = () => {
  // Sample event data for design purposes
  const userEvents = [
    {
      id: "1",
      title: "Community Garden Cleanup",
      description:
        "Join us for a day of community service as we clean and beautify our local garden space.",
      date: "March 15, 2024",
      location: "Central Park Garden",
      eventType: "Community Service",
      imageUrl:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Food Drive for Local Shelter",
      description:
        "Help us collect non-perishable food items for families in need during the holiday season.",
      date: "March 22, 2024",
      location: "Downtown Community Center",
      eventType: "Charity",
      imageUrl:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between flex-wrap items-center mb-8 gap-5">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Your Events
          </h1>
          <Link to="/create-event">
            <button className="bg-teal-600 btn hover:bg-teal-700 text-white ">
              <PiPlus className="inline mr-1" /> Create Event
            </button>
          </Link>
        </div>
        {userEvents.length > 0 ? (
          <div className="space-y-6">
            {userEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/4 h-48 md:h-auto">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-teal-700 bg-indigo-100 rounded-full">
                    <div className="flex items-center">
                      <PiTagChevron className="h-3 w-3 mr-1" />
                      {event.eventType}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm">
                    <div className="flex items-center mr-6 mb-2 sm:mb-0">
                      <PiCalendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <PiMapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-row md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-4 border-t md:border-t-0 md:border-l border-gray-200">
                  <Link to={`/event/${event.id}`}>
                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md flex items-center transition-colors w-full">
                      <PiPencil className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                  </Link>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center transition-colors w-full">
                    <PiTrash className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              You haven't created any events yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first event and start making a difference in your
              community.
            </p>
            <Link to="/create-event">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
                <FiPlus className="h-4 w-4 mr-2" />
                Create Event
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
