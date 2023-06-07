import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import HomeDetails from "../components/HomeDetails/HomeDetails";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import InstructorPage from "../Pages/InstructorsPage/InstructorPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import MySelectedClass from "../Dashboard/Student/MySelectedClass";
import MyEnrolledClass from "../Dashboard/Student/MyEnrolledClass";
import ManageClasses from "../Dashboard/Admin/ManageClasses";
import ManageUsers from "../Dashboard/Admin/ManageUsers";



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
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'myselectedclass',
        element: <MySelectedClass></MySelectedClass>
      },
      {
        path: 'myenrolledclass',
        element: <MyEnrolledClass></MyEnrolledClass>
      },
      {
        path: 'manageclasses',
        element: <ManageClasses></ManageClasses>
      },
      {
        path: 'manageusers',
        element: <ManageUsers></ManageUsers>
      }
    ]
  }
]);


export default router;