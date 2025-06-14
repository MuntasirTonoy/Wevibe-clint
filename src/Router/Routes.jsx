import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Root";
import ManageEvents from "../Pages/ManageEvents";
import JoinedEvents from "../Pages/JoinedEvent";
import EventDetails from "../Pages/EventDetails";
import UpcomingEvents from "../Pages/Upcomingevents";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Private/PrivateRoute";
import CreateEvent from "../Pages/CreateEvent";
import EditEvent from "../Pages/EditEvent";
import ErrorPage from "../Pages/ErrorPage";
import Loading from "../Components/Loading";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "event/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${params.id}`).then(
            (res) => res.json()
          ),
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
        hydrateErrorElement: <ErrorPage />,
      },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "upcoming-events",
        element: <UpcomingEvents />,
      },
      {
        path: "edit-event/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${params.id}`),
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default Routes;
