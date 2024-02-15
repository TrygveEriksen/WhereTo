import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { API } from "../../API/API";
import "./Mypage.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function Mypage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const username = await API.get("/getUser");
    setUser(username.data.username);
  };

  return (
    <>
      <Navbar />
      <div className="divMypage">
        <h1>My page</h1>
        <h2>Username: {user}</h2>
        <p>This is my userpage</p>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </div>
    </>
  );
}

export default Mypage;
