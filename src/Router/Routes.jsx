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
        path: "event-details",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
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
        path: "edit-event",
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
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
