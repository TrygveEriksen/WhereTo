import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import "./index.css";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App/>
        <Link to="/login">login</Link>
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
]);

createRoot(document.getElementById("root")).render(
  );
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
