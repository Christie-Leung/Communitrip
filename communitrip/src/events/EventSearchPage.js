import NavBar from "../components/NavBar";
import "./style/EventSearchPage.css";
import { AiOutlineSearch } from "react-icons/ai";
import Banner from "../components/Banner";
import PageBody from "../components/PageBody";
import EventActionButton from "../components/EventActionButton";


function Search() {

    return (
        <>
            <div className="window-container" style={{
                backgroundColor: "white",
                overflowY: "scroll",
                overflowX: "hidden",
            }}>
                <div className="view">
                    <div id="event-search-page"className="header-container">
                        <div className="search_bar">
                            <input type="text" className="search-bar-input"/>
                            <AiOutlineSearch/>
                        </div>
                        <NavBar page={"trips"}/>
                    </div>
                    <PageBody/>
                    
                </div>
                <EventActionButton link="/event/add" buttonText="Add Event"/>
            </div>
        </>
      
    )
}

export default Search;