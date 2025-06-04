import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Root";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1> im error</h1>,
    children: [
      {
        path: "/upcoming-events",
        element: <h1>im umcomoing</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <h1> im login</h1>,
  },
]);
export default Routes;
