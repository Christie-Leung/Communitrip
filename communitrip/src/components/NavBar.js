import "./style/NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../setup/Firebase-config";
import { useState } from "react";

export default function NavBar({ page, isDarkTheme}){

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
                <button className={page === "home" ? "navbar-button-text-enabled" : "navbar-button-text-disabled" }
                        style={ isDarkTheme ? { color: "#fff"}: {}}
                        >Home</button>
            </Link>
            <Link to={"/trips"}>
                <button style={ isDarkTheme ? { color: "#fff"}: {}}
                className={page === "trips" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Trips</button>
            </Link>
            <Link to={"/faq"}>
                <button style={ isDarkTheme ? { color: "#fff"}: {}}
                className={page === "faq" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>FAQ</button>
            </Link>
            { IsAuth ? 
            <>
                <Link to={`/profile/${localStorage.getItem("userUID")}`}>
                    <button style={ isDarkTheme ? { color: "#fff"}: {}}
                    className={page === "profile" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Profile</button>
                </Link>
                <Link to={"/"}>
                    <button style={ isDarkTheme ? { color: "#fff"}: {}}
                    className={"navbar-button-text-disabled"} onClick={signUserOut}>Sign Out</button>
                </Link> 
            </>
            :
                <Link to={"/login"}>
                    <button style={ isDarkTheme ? { color: "#fff"}: {}}
                    className={page === "login" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Log In</button>
                </Link>
            }
        </div>
        </>
    )
}