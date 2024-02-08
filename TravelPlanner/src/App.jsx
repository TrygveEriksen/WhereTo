import "./App.css";
import Home from "./Components/Home/Home";
import Descriptions from "./Components/Descriptions/Descriptions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/descriptions/:id" element={<Descriptions />} />
    </Routes>
  </Router>
  )
}

export default App;
