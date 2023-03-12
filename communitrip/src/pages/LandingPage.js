import Chatbot from "../components/Chatbot";
import NavBar from "../components/NavBar";
import homepageLogo from "../components/homepagelogo.PNG"
import "./style/LandingPage.css"
import { Link } from "react-router-dom";

export default function LandingPage() {

    return (
        <>
            <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"home"}/>
                        <Chatbot/>
                    </div>
                </div>

                <div className="landing_photo">
                    <img className="event_photo_image" src={homepageLogo} alt="homepage"/>
                </div>

                <div>
                <div className="landing_join_button">
                    <Link to="/event" 
                    className="join">Start Looking</Link>
                </div>
                </div>
            </div>
        </>
    )
}