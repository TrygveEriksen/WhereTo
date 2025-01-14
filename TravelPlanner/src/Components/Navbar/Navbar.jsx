import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { API } from "../../API/API";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";

function Navbar() {
  const [permission, setPermission] = useState(0);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const isAdmin = await API.get("/admin");
    setPermission(isAdmin.data.permission);
  };

  const handelMobileMenu = async () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <nav className="navbar" data-testid="navbar-test">
        <div className="navbar-item" id="navbar-left">
          <Link to="/" className="nav-link">
            <img
              src="/images/SVG/logo_home.svg"
              alt="logo"
              className="nav-logo"
              height="50px"
            />
          </Link>
        </div>
        <div className="navbar-item" id="navbar-right">
          <DarkModeToggle />
          <div className="navbar-item">
            <Link to="/newdestination" className="nav-link">
              <img
                src="/images/SVG/pluss.svg"
                alt="new_destination"
                className="nav-logo"
                height="60px"
              />
              <br />
              <span className="nav-text">Ny destinasjon</span>
            </Link>
          </div>
          <div className="navbar-item">
            {permission == 1?
            <Link to="/AddAd" className="nav-link">
            <img
                src="/images/SVG/admin2.svg"
                alt="my_page"
                className="nav-logo"
                height="60px"
              />
              <br />
              <span className="nav-text">Reklame</span> 
            </Link>
            :null}
            <Link to="/myPage" className="nav-link">
              <img
                src="/images/SVG/mypage.svg"
                alt="my_page"
                className="nav-logo"
                height="60px"
              />
              <br />
              <span className="nav-text">Min side</span>
            </Link>

            <Link
              to="/login"
              className="signout nav-link"
              onClick={() => localStorage.removeItem("user")}
            >
              <img
                src="/images/SVG/logout.svg"
                alt="log_out"
                className="nav-logo"
                height="60px"
              />
              <br />
              <span className="navText">Logg ut</span>
            </Link>
          </div>
        </div>

        <div onClick={handelMobileMenu} className="mobileMenu">
          <img
            src="/images/SVG/Burger.svg"
            alt="hamburger-menu"
            height="40px"
          />
        </div>
      </nav>

      {isMobileMenu && (
        <div className="mobileMenuList">
          <ul className="listMenu">
            <li>
              <Link to="/newdestination" className="nav-link">
                <span className="menu-link-text">Ny destinasjon</span>
              </Link>
            </li>
            <li>
              <Link to="/myPage" className="nav-link">
                <span className="menu-link-text">Min side</span>
              </Link>
            </li>
            <li>
              <DarkModeToggle />
            </li>
            <li>
              <Link
                to="/login"
                className="signout menu-link-text"
                onClick={() => localStorage.removeItem("user")}
              >
                <span className="navText">Logg ut</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default Navbar;
