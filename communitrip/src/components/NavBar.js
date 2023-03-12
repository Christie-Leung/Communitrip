import "./style/NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../setup/Firebase-config";

export default function NavBar({ page }){

    let navigate = useNavigate();
    let IsAuth = localStorage.getItem("isAuth");

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem("isAuth", false);
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
            { !IsAuth ? 
            <>
                <Link to={"/profile"}>
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
            }
        </div>
        </>
    )
}