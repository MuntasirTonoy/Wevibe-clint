import React, { useState, useEffect, useContext } from "react";
import {
  PiPlus,
  PiTagChevron,
  PiCalendar,
  PiMapPin,
  PiPencil,
  PiTrash,
} from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../Components/Loading";
import swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/not-found.json";

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/events`,
          {
            params: { author: user.email },
          }
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching user's events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [user?.email]);

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
        setEvents((prev) => prev.filter((event) => event._id !== id));
        swal.fire("Deleted!", "Your event has been deleted.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        swal.fire("Error!", "Failed to delete the event.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
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
            <span>Error: {error}</span>
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
                <div className="p-6 flex flex-row md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-4 border-t md:border-t-0 md:border-l border-gray-200">
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
          <div className="text-center py-12 bg-white rounded-lg ">
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
