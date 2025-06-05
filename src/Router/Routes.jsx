import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Root";
import ManageEvents from "../Pages/ManageEvents";

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
        path: "/upcoming-events",
        element: <h1>im umcomoing</h1>,
      },
      {
        path: "manage-events",
        element: <ManageEvents />,
      },
    ],
  },
  {
    path: "/login",
    element: <h1> im login</h1>,
  },
]);
export default Routes;
