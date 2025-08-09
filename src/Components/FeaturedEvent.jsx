import React from "react";
import EventCard from "./EventCard";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Components/Loading";

const fetchEvents = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`);
  return res.data;
};

const FeaturedEvents = () => {
  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error loading events: {error.message}</span>
      </div>
    );
  }

  const featuredEvents = events.slice(0, 3); // only first 3

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>

        {featuredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">No events available at the moment.</p>
          </div>
        ) : (
          <div className="w-full sm:w-10/12 md:w-11/12 lg:w-11/12 px-5 mx-auto">
            <Fade direction="up" triggerOnce>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                {featuredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </Fade>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/upcoming-events"
          className="btn bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
        >
          View All Events
        </Link>
      </div>
    </section>
  );
};

export default FeaturedEvents;
