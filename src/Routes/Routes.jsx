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
import AddAClass from "../Dashboard/Instructor/AddAClass";
import MyClasses from "../Dashboard/Instructor/MyClasses";
import ClassesPage from "../Pages/ClassesPage/ClassesPage";
import PaymentHistory from "../Dashboard/Student/PaymentHistory";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import DashboardEmpty from "../Dashboard/DashboardEmpty";
// import PaymentPage from "../Pages/PaymentPage/PaymentPage";



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
        element: <InstructorPage></InstructorPage>
      },
      {
        path: "/classes",
        element: <ClassesPage></ClassesPage>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  },
  
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardEmpty></DashboardEmpty>
      },
      {
        path: 'myselectedclasses',
        element: <PrivateRoute><StudentRoute><MySelectedClass></MySelectedClass></StudentRoute></PrivateRoute>
      },
      {
        path: 'myenrolledclass',
        element: <PrivateRoute><StudentRoute><MyEnrolledClass></MyEnrolledClass></StudentRoute></PrivateRoute>
      },
      {
        path: 'paymentHistory',
        element: <PrivateRoute><StudentRoute><PaymentHistory></PaymentHistory></StudentRoute></PrivateRoute>
      },
      {
        path: 'manageclasses',
        element: <PrivateRoute><AdminRoute><ManageClasses></ManageClasses></AdminRoute></PrivateRoute>
      },
      {
        path: 'manageusers',
        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path: 'addaclass',
        element: <PrivateRoute><InstructorRoute><AddAClass></AddAClass></InstructorRoute></PrivateRoute>
      },
      {
        path: 'myclass',
        element: <PrivateRoute><InstructorRoute><MyClasses></MyClasses></InstructorRoute></PrivateRoute>
      }
    ]
  },
  

]);


export default router;