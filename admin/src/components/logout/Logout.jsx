import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

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
    return(
        <div>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={logout} >
                <ExitToAppIcon className="icon" />
            <span>Logout</span>
            </Link>
        </div>
    )
}

