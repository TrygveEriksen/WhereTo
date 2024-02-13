import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home/Home";
import Descriptions from "./Components/Descriptions/Descriptions";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import NewDestination from "./Components/NewDestination/NewDestination"
import "./index.css";
import "./Colors/lightmode.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// redirects if users not logged in (if localstorage empty)
const redirectNotLoggedIn = async () =>{
  if (!localStorage.getItem('user')){
    console.log("redirect from loader");
     await new Promise(() => {window.location.href = "/login"})
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
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
