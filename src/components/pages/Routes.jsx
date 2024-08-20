import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Index from "./Index";
import LoaderWrapper from "../wrappers/LoaderWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoaderWrapper />,
    children:
      [
        {
          path: "/",
          element: <Index />,
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