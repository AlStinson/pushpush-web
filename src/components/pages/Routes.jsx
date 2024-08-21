import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Layout from "./Layout";
import Play from "./Play";
import About from "./About";
import Rules from "./Rules";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:
      [
        {
          path: "/",
          element: <Play />,
        },
        {
          path: "/home",
          element: <Play />,
        },
        {
          path: "/play",
          element: <Play />,
        },
        {
          path: "/rules",
          element: <Rules />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/matchmaking",
          lazy: async () => {
            return { Component: (await import("./Matchmaking")).default };
          },
        },
        {
          path: "/game/:gameId/:kind",
          lazy: async () => {
            return { Component: (await import("./Game")).default };
          },
        },
        {
          path: "/error",
          element: <Error />
        },
        {
          path: "/*",
          element: <Navigate to={"/error"} state={"404 Page not found"} />
        }
      ]
  }]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;