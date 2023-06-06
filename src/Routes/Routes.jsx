import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import HomeDetails from "../components/HomeDetails/HomeDetails";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";



const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
      children: [
        {
            path: "/",
            element: <HomeDetails></HomeDetails>
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
    }
  ]);


export default router;