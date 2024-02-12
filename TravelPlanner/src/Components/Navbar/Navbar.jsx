import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar(){
	return (
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link to="/"> 
						<img src={'/images/logo.svg'} alt="logo" id='nav-logo'/> 
						<span>Where to?</span>
					</Link>
				</li>
				<li></li>
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