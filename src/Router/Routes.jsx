import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Root";
import ManageEvents from "../Pages/ManageEvents";
import JoinedEvents from "../Pages/JoinedEvent";
import EventDetails from "../Pages/EventDetails";
import UpcomingEvents from "../Pages/Upcomingevents";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1> im error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "manage-events",
        element: <ManageEvents />,
      },
      {
        path: "joined-events",
        element: <JoinedEvents />,
      },
      {
        path: "event-details",
        element: <EventDetails />,
      },
      {
        path: "upcoming-events",
        element: <UpcomingEvents />,
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
