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
import { format } from "date-fns";

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-base-100 rounded-lg shadow-md grid md:grid-cols-12 md:h-64 overflow-hidden relative"
              >
                {/* Image */}
                <div className="col-span-4 overflow-hidden max-h-72 ">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content + Actions wrapper */}
                <div className="md:col-span-8 flex flex-col p-6 gap-4">
                  {/* Content: flex-grow so buttons can stick bottom */}
                  <div className="flex-grow">
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
                        {format(new Date(event.eventDate), "MMMM dd, yyyy")}
                      </div>
                      <div className="flex items-center">
                        <PiMapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Actions: bottom right */}
                  <div className="flex justify-end space-x-4 mt-auto">
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="border border-gray-300 hover:bg-base-200 px-4 py-2 rounded-md flex items-center transition-colors"
                    >
                      <PiPencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                    >
                      <PiTrash className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-base-200 rounded-lg">
            <h3 className="text-lg font-medium text-base-content mb-2">
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
