import "./style/NavBar.css"
import { Link } from "react-router-dom";

export default function NavBar({ page, IsAuth }){

    return (
        <>
        <div className={"navbar-button-container"}>
            <Link to={"/"}>
                <button className={page === "home" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Home</button>
            </Link>
            <Link to={"/trips"}>
                <button className={page === "trips" ? "navbar-button-text-enabled" : "navbar-button-text-disabled"}>Trips</button>
            </Link>
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
            }
        </div>
        </>
    )
}