import React, { useContext } from "react";
import {
  PiPlus,
  PiTagChevron,
  PiCalendar,
  PiMapPin,
  PiPencil,
  PiTrash,
} from "react-icons/pi";
import { Link } from "react-router";
import axios from "axios";
import Loading from "../Components/Loading";
import swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/not-found.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUserEvents = async (email) => {
  if (!email) return [];
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    params: { author: email },
  });
  return res.data;
};

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userEvents", user?.email],
    queryFn: () => fetchUserEvents(user?.email),
    enabled: !!user?.email,
    staleTime: 5 * 60 * 1000,
  });

  const handleDelete = async (id) => {
    const confirm = await swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#a0aec0",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/${id}`);
        swal.fire("Deleted!", "Your event has been deleted.", "success");
        // Refetch to update the event list
        queryClient.invalidateQueries(["userEvents", user?.email]);
      } catch (err) {
        console.error("Delete error:", err);
        swal.fire("Error!", "Failed to delete the event.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
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
            <span>Error: {error?.message || "Failed to load events."}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between flex-wrap items-center mb-8 gap-5">
          <h1 className="text-3xl font-bold text-primary-100">
            Manage Your Events
          </h1>
          <Link to="/create-event">
            <button className="bg-teal-600 btn hover:bg-teal-700 text-white">
              <PiPlus className="inline mr-1" /> Create Event
            </button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-base-100 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-64 lg:w-80 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="inline-flex">
                    <span className="bg-indigo-100 text-teal-800 flex px-2 py-1 rounded-full text-xs font-semibold items-center mb-3">
                      <PiTagChevron className="h-3 w-3 mr-1" />
                      {event.eventType}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm mt-2 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                      <div className="flex items-center mr-6 mb-2 sm:mb-0">
                        <PiCalendar className="h-4 w-4 mr-2" />
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <PiMapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-row md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-4 border-t md:border-t-0 md:border-l border-gray-200 flex-shrink-0">
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="border border-gray-300 hover:bg-base-200 px-4 py-2 rounded-md flex items-center transition-colors w-full"
                  >
                    <PiPencil className="h-4 w-4 mr-2" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center transition-colors w-full"
                  >
                    <PiTrash className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-base-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              You haven't created any events yet
            </h3>
            <p className="text-gray-500 mb-6 px-2">
              Create your first event and start making a difference in your
              community.
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

export default ManageEvents;
