import { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { API } from '../../API/API';

function Navbar(){
	const [permission, setPermission] = useState(0);

	useEffect(()=>{
		load();
	}, []);

	const load = async ()=>{
		const isAdmin = await API.get("/admin");
		setPermission(isAdmin.data.permission);
	}



	return (
		<nav className="navbar" data-testid="navbar-test">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/"> 
						<img src={'/images/logo.svg'} alt="logo" id='nav-logo'/> 
						<span>Where to?</span>
					</Link>
				</li>
				{permission == 1?<li >
					<Link to="/newdestination">
						Jeg er admin
					</Link>
					</li>:null}
				<li className="nav-item">Mypage</li>
				<li>				
					<Link to="/login" className="signout" onClick={() => localStorage.removeItem("user")}>
						Logg ut
					</Link>
				</li>

			</ul>
		</nav>
	)
}
export default Navbar