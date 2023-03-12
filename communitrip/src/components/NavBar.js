import "./style/NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../setup/Firebase-config";
import { useState } from "react";

export default function NavBar({ page }){

    let navigate = useNavigate();
    const [IsAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem("isAuth", false);
            setIsAuth(false);
            navigate("/");
        })
    }

    return (
        <>
        <div className={"navbar-button-container"}>
            <Link to={"/"}>
                <button className={page === "home" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Home</button>
            </Link>
            <Link to={"/trips"}>
                <button className={page === "trips" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Trips</button>
            </Link>
<<<<<<< HEAD
            <Link to={"/profile"}>
                <button className={page === "profile" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Profile</button>
            </Link>
            { IsAuth ? 
                <Link to={"/"}>
                    <button className={"navbar-button-text-disabled"}>Sign Out</button>
                </Link> :
                <>
                    <Link to={"/login"}>
                        <button className={"navbar-button-text-disabled"}>Log In</button>
                    </Link>
                    <Link to={"/signup"}>
                        <button 
                        className={"navbar-button-text-disabled"}>Create Account</button>
                    </Link>
                </>
=======
            { IsAuth ? 
            <>
                <Link to={`/profile/${localStorage.getItem("userUID")}`}>
                    <button className={page === "profile" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Profile</button>
                </Link>
                <Link to={"/"}>
                    <button className={"navbar-button-text-disabled"} onClick={signUserOut}>Sign Out</button>
                </Link> 
            </>
            :
                <Link to={"/login"}>
                    <button className={page === "login" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Log In</button>
                </Link>
>>>>>>> e4a9bcb1f12cb1527a641f80754b5e3cfcbe393d
            }
        </div>
        </>
    )
}