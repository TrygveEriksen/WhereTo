import "./App.css";
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Components/Home/Home";


const routes = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {path: '/', element: <Home/>}
      ]
    }
  ]
)


function App() {
  return(
    <>
    <Navbar />
    <RouterProvider router={routes}/>
    </>
  )
}

export default App;
