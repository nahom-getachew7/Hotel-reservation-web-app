import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout";
export default function Logout(){
    const {dispatch} = useContext(AuthContext);
    const logout = ()=>{
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('user');

    window.location.href = '/';
    }
    return (
      <div className={`hover:${"Logout"}`}>
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
          onClick={logout}
        >
          <LogoutIcon />
        </Link>
      </div>
    );
}