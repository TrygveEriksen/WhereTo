import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home/Home";
import Descriptions from "./Components/Descriptions/Descriptions";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import NewDestination from "./Components/NewDestination/NewDestination";
import MyPage from "./Components/Mypage/Mypage";
import Advertisement from "./Components/Advertisement/Advertisement";
import AddAd from "./Components/Advertisement/AddAd";
import "./index.css";
import "./Colors/lightmode.css";
import "./Colors/darkmode.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateDestination from "./Components/UpdateDestination/UpdateDestination";
import { API } from "./API/API";


// redirects if users not logged in (if localstorage empty)
const redirectNotLoggedIn = async () =>{
  if (!localStorage.getItem('user')){
     await new Promise(() => {window.location.href = "/login"})
  }
  return{}
}

const redirectNotAdmin = async () =>{
  const adminData = await API.get("/admin");
  if (adminData.data?.permission != 1) {
    await new Promise(() => {window.location.href = "/"})
  }
  return{}
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/descriptions/:id",
    element: <Descriptions />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/newdestination",
    element: <NewDestination />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/mypage",
    element: <MyPage />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/editdestination/:id",
    element: <UpdateDestination />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/Advertisement",
    element: <Advertisement />,
    loader: redirectNotLoggedIn
  },
  {
    path: "/AddAd",
    element: <AddAd />,
    loader: redirectNotAdmin
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
