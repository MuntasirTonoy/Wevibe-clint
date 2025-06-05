import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const Feature = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            How CommunityServe Works
          </h2>
          <p className="text-lg  max-w-3xl mx-auto">
            Our platform makes it easy to create, find, and join community
            service events that match your interests and availability.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 - Create Events */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 text-teal-600 rounded-lg flex items-center justify-center mb-5">
              <FaCalendarAlt className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Create Events
            </h3>
            <p className="text-gray-600 mb-4">
              Easily create and manage community service events. Set dates,
              locations, and event types to organize impactful activities.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Simple event creation process
                </span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Manage registrations
                </span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Share on social media
                </span>
              </li>
            </ul>
          </div>

          {/* Feature 2 - Discover Opportunities */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 text-teal-600 rounded-lg flex items-center justify-center mb-5">
              <FaMapMarkerAlt className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Discover Opportunities
            </h3>
            <p className="text-gray-600 mb-4">
              Find events in your local area that match your interests, skills,
              and availability. Filter by event type and date.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Location-based search
                </span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Filter by event categories
                </span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Find events that fit your schedule
                </span>
              </li>
            </ul>
          </div>

          {/* Feature 3 - Join & Participate */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 text-teal-600 rounded-lg flex items-center justify-center mb-5">
              <FaUsers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Join & Participate
            </h3>
            <p className="text-gray-600 mb-4">
              Join events with one click and connect with like-minded
              volunteers. Track your participation and impact.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Simple registration process
                </span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">Event reminders</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Track your volunteer hours
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
