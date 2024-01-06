import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/icon.svg";
import LoginBtn from "../LogIn/login";
import SignupBtn from "../Register/signup";
import Logout from "../Logout/logout";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));


const Navbar = () => {
  const login = "Login";
  const register = "Register";
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 h-20 p-4 fixed w-full z-10 shadow-blue-300 shadow-xl">
      <div className="container mx-auto flex items-center justify-between flex-row">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src={logo} alt="Logo" className="h-16 w-16" />
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center h-16">
              <Link to="/profile" className="text-white ">
                {/* Use Avatar component for the circular user image */}
                {/* <Avatar alt={user.fullName} src={user.profileImage} /> */}
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={user.fullName}
                    src="/static/images/avatar/1.jpg"
                  />
                </StyledBadge>
                <div className="mr-2">{user.fullName}</div>
              </Link>
              <div className="text-white">
                <Logout />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <SignupBtn name={register} />
              </div>
              <div className="text-white">
                <LoginBtn name={login} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
