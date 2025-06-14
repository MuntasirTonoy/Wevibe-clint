import React, { use, useContext, useEffect, useState } from "react";
import { PiTagChevron, PiCalendar, PiMapPin } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router"; // corrected import
import { FaRegTrashAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/not-found.json";

const JoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/joined-events?email=${userEmail}`
        );
        setUserEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch joined events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [userEmail]);

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between flex-wrap items-center mb-8 gap-5">
          <h1 className="text-3xl font-bold ">Your Joined Events</h1>
          <button className="bg-red-600 btn hover:bg-red-700 text-white">
            <FaRegTrashAlt />
            Delete All
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading events...</p>
        ) : userEvents.length > 0 ? (
          <div className="space-y-6">
            {userEvents.map((event) => (
              <div
                key={event._id}
                className="bg-base-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
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
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm mt-2 mb-4">{event.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm">
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
                  <Link to={`/event/${event._id}`}>
                    <button className="border border-gray-300 hover:bg-base-100 px-4 py-2 rounded-md flex items-center transition-colors w-full">
                      <TbListDetails className="mr-2" /> View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-base-100 rounded-lg ">
            <h3 className="text-lg font-medium  mb-2">
              You haven't created any events yet
            </h3>
            <p className=" mb-6 px-2">
              It seems you haven't joined any events yet. Explore our upcoming
              events and join one to get started!
            </p>
            <Lottie
              className="w-52 mx-auto"
              animationData={animationData}
              loop={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;
