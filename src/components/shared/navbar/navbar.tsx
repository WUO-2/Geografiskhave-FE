import { IRoute } from "../../../interfaces/IRoute";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import logoutIcon from "../../../assets/icons/logout.svg";

const Navbar = ({ routes }: { routes: IRoute[] }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="Navbar_Container">
      {routes.map((route, index) => (
        <NavLink
          key={index}
          to={route.path}
          className={({ isActive }) =>
            isActive ? "Navbar_Link_Active" : "Navbar_Link"
          }
        >
          <div className="Navbar_Link_Icon_Container">
            <img src={route.icon} alt="icon" className="Navbar_Link_Icon" />
          </div>
          <p className="Navbar_Link_Text">{route.title}</p>
        </NavLink>
      ))}
      <button className="Navbar_Link" onClick={() => handleLogout()}>
        <div className="Navbar_Link_Icon_Container">
          <img src={logoutIcon} alt="icon" className="Navbar_Link_Icon" />
        </div>
        <p className="Navbar_Link_Text">Log ud</p>
      </button>
    </nav>
  );
};

export default Navbar;
