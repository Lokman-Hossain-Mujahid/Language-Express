import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import HomeDetails from "../components/HomeDetails/HomeDetails";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import InstructorPage from "../Pages/InstructorsPage/InstructorPage";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeDetails></HomeDetails>
      },
      {
        path: "/instructors",
        element: <PrivateRoute><InstructorPage></InstructorPage></PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
]);


export default router;