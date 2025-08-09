import React, { useContext, useEffect, useState } from "react";
import { PiTagChevron, PiCalendar, PiMapPin } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router"; // fixed import
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/not-found.json";
import Loading from "../Components/Loading";

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

    if (userEmail) {
      fetchJoinedEvents();
    }
  }, [userEmail]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex justify-between flex-wrap items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Your Joined Events</h1>
          {userEvents.length > 0 && (
            <button className="bg-red-600 btn hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-md">
              <FaRegTrashAlt />
              Delete All
            </button>
          )}
        </div>

        {/* Event List */}
        {!loading && userEvents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {userEvents.map((event) => (
              <div
                key={event._id}
                className="bg-base-100 rounded-lg shadow-md grid md:grid-cols-12 md:h-64 overflow-hidden"
              >
                {/* Image */}
                <div className="col-span-4">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content + Actions */}
                <div className="p-6 flex flex-col justify-between md:col-span-8">
                  <div>
                    <div className="inline-flex items-center px-2 py-1 mb-2 text-xs font-semibold text-teal-700 bg-indigo-100 rounded-full">
                      <PiTagChevron className="h-3 w-3 mr-1" />
                      {event.eventType}
                    </div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-sm mt-2 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm gap-2">
                      <div className="flex items-center">
                        <PiCalendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <PiMapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Actions (side by side for md+, stacked for mobile) */}
                  <div className="mt-4 md:mt-0 md:self-end">
                    <Link to={`/event/${event._id}`}>
                      <button className="border border-gray-300 hover:bg-base-200 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors w-full md:w-auto">
                        <TbListDetails /> View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && userEvents.length === 0 && (
          <div className="text-center py-12 bg-base-100 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              You haven't joined any events yet
            </h3>
            <p className="mb-6 px-2">
              Explore our upcoming events and join one to get started!
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
