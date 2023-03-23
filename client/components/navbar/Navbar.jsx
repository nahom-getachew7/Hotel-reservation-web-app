import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../assets/images/icon.svg';
import LoginBtn from "../LogIn/Register/login";
import SignupBtn from "../LogIn/Register/signup";
const Navbar = () => {
  const login = "Login";
  const register = "Register";
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <img  src={logo} alt=" Logo" style={{paddingTop:25 ,height:'160px' , width:'160px'}} />
        </Link>
        {user ? user.username : (
          <div className="navItems">
            <div className="navButton"><SignupBtn name={register}/></div>
            <div className="navButton"><LoginBtn name={login}/></div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
