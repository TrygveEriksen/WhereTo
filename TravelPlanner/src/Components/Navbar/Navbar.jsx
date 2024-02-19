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
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/" className='nav-link'> 
						<img src='/images/SVG/logo_home.svg' alt="logo" className='nav-logo' height="50px"/>
					</Link>
				</li>
				{permission == 1?<li className='nav-item'>
					<Link to="/newdestination" className='nav-link'>
						<img src='/images/SVG/admin2.svg' alt="admin" className='nav-logo' height="60px"/>
						<br />
						<span className='nav-text'>Admin</span>
					</Link>
					</li>:null}
				<li className="nav-item">
					<Link to= "/myPage" className='nav-link'>
						<img src='/images/SVG/mypage.svg' alt="my_page" className='nav-logo' height="60px"/>
						<br />
						<span className='nav-text'>Min side</span>
					</Link>
				</li>
				<li>				
					<Link to="/login" className="signout nav-link" onClick={() => localStorage.removeItem("user")}>
						<img src='/images/SVG/logout.svg' alt="log_out" className='nav-logo' height="60px"/>
						<br />
						<span className='navText'>Logg ut</span>
					</Link>
				</li>

			</ul>
		</nav>
	)
}
export default Navbar