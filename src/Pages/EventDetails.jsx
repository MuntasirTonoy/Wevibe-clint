import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";

import {
  PiCalendar,
  PiMapPin,
  PiTagChevron,
  PiArrowLeft,
} from "react-icons/pi";

const EventDetails = () => {
  const eventData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [joined, setJoined] = useState(false);

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
    joinedUsers = [],
  } = eventData;

  // Initialize joined state
  useEffect(() => {
    if (user?.email && joinedUsers.includes(user.email)) {
      setJoined(true);
    }
  }, [user, joinedUsers]);

  // Handle join/unjoin toggle
  const handleJoinEvent = async () => {
    if (!user) {
      swal.fire("Login Required", "Please login to join the event.", "warning");
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/join-event`,
        {
          eventId: _id,
          userEmail: user.email,
        }
      );

      if (res.data?.joined) {
        setJoined(true);
        swal.fire(
          "Joined",
          "You have successfully joined the event.",
          "success"
        );
      } else {
        setJoined(false);
        swal.fire("Unjoined", "You have left the event.", "info");
      }
    } catch (error) {
      console.error(error);
      swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/upcoming-events"
          className="flex items-center mb-6 transition-colors"
        >
          <PiArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

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
            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <PiCalendar className="h-5 w-5 mr-2" />
                {format(new Date(eventDate), "PP")}
              </div>
              <div className="flex items-center">
                <PiMapPin className="h-5 w-5 mr-2" />
                {location}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Description</h3>
              <p className="leading-relaxed">{description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-medium mb-1">Organized by:</h3>
                  <p>{author.name}</p>
                  Event created on:{" "}
                  <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <button
                    onClick={handleJoinEvent}
                    className={`${
                      joined
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-teal-600 hover:bg-teal-700"
                    } text-white px-8 py-3 rounded-md text-lg font-medium transition-colors cursor-pointer`}
                  >
                    {joined ? "Unjoin Event" : "Join Event"}
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
