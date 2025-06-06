import React from "react";
import {
  PiCalendar,
  PiMapPin,
  PiTagChevron,
  PiArrowLeft,
} from "react-icons/pi";

const EventDetails = () => {
  const sampleEvent = {
    id: "1",
    title: "Community Garden Cleanup",
    description:
      "Join us for a day of community service as we clean and beautify our local garden space. We'll be working together to remove weeds, plant new flowers, and create a more welcoming environment for everyone in the community. This is a great opportunity to meet like-minded people while making a positive impact on our neighborhood. All tools and supplies will be provided, just bring your enthusiasm and a pair of work gloves if you have them. Light refreshments will be served throughout the day.",
    date: "March 15, 2024",
    location: "Central Park Garden",
    eventType: "Community Service",
    organizer: "Green City Initiative",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <PiArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-64 md:h-96 w-full relative">
            <img
              src={sampleEvent.imageUrl}
              alt={sampleEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 text-sm font-medium text-teal-700 flex items-center shadow-md">
              <PiTagChevron className="h-4 w-4 mr-1" />
              {sampleEvent.eventType}
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {sampleEvent.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <div className="flex items-center text-gray-600 mr-6 mb-2 sm:mb-0">
                <PiCalendar className="h-5 w-5 mr-2" />
                {sampleEvent.date}
              </div>
              <div className="flex items-center text-gray-600">
                <PiMapPin className="h-5 w-5 mr-2" />
                {sampleEvent.location}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {sampleEvent.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Organized by:
                  </h3>
                  <p className="text-gray-600">{sampleEvent.organizer}</p>
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
