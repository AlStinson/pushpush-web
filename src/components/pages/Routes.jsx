import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Error";
import Game from "./Game";
import Index from "./Index";
import Matchmaking from "./Matchmaking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/matchmaking",
    element: <Matchmaking />
  },
  {
    path: "/game/:gameId/:kind",
    element: <Game />,
  },
  {
    path: "/error",
    element: <Error />
  },
  {
    path: "/*",
    element: <Navigate to={"/error"} state={"404 Page not found"} />
  }
])

const Routes = () => <RouterProvider router={router} />;

export default Routes;