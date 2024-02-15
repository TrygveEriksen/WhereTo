import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { API } from "../../API/API";

function Mypage() {
  const [user, setUser] = useState(""); 

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const username = await API.get("/getUser");
    setUser(username.data.username)
  };


  return (
	<>
	<Navbar />
    <div>
		<h1>Hei {user}</h1>
		<p>Dette er din brukerside</p>
		<p>Her vil det etterhvert vært mulig å slette brukeren din</p>
    </div>
  <Footer />
	</>
  )

}

export default Mypage
