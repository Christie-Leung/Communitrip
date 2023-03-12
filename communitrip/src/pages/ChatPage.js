import ChatBoxView from "../components/ChatBoxView";
import NavBar from "../components/NavBar";
import "./style/ChatPage.css"

export default function ChatPage({ chatID }) {

    return (
        <>
            <div className="window-container" style={{
                        backgroundColor: "#1b1b1b",
                        overflowY: "scroll",
                        overflowX: "hidden",
                }}>
                    <div className="view">
                        <div className="header-container">
                            <NavBar page={"chat"} isDarkTheme={true}/>
                        </div>
                        <ChatBoxView chatID={chatID} 
                        hideSideBar={false}
                        leftContainerStyle={{ width: "75%" }}
                        bot={true}/>
                    </div>
                </div>
            </>
    )
}

// add <ParticipantsContainer eventID={id} style={{ height: "100%" }}/>