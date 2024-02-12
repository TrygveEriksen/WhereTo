import './Navbar.css'

function Navbar(){
	return (
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="nav-item">
					<a href="hjelp">
						<img src={'images/logo.svg'} alt="logo" id='nav-logo'/> 
						<span>Where to?</span>
					</a>
				</li>
				<li className="nav-item">Mypage</li>
			</ul>
		</nav>
	)
}
export default Navbar