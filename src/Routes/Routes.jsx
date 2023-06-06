import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import HomeDetails from "../components/HomeDetails/HomeDetails";



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
  ]);


export default router;