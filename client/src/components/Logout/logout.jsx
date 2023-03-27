import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"

export default function Logout(){
    const {dispatch} = useContext(AuthContext);
    const logout = ()=>{
        dispatch({ type: 'LOGOUT' });

    // remove user from local storage to log user out
    localStorage.removeItem('user');

    window.location.href = '/';
    }
    return(
        <div>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={logout} >
                Logout
            </Link>
        </div>
    )
}