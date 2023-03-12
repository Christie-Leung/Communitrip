import { useEffect, useRef, useState } from "react";
import PlannerAI from "../ai/plannerAI";
import ChatBoxView from "../components/ChatBoxView";
import NavBar from "../components/NavBar";
import { API_KEY } from "../setup/Firebase-config";
import "./style/ChatPage.css"

export default function ChatPage({ id }) {

    return (
        <>
            <div className="window-container" style={{
                        backgroundColor: "#1b1b1b",
                        overflowY: "scroll",
                        overflowX: "hidden",
                }}>
                    <div className="view">
                        <div className="header-container">
                            <NavBar page={"chat"}/>
                        </div>
                        <ChatBoxView eventID={id} hideSideBar={false}/>
                    </div>
                </div>
            </>
    )
}

// add <ParticipantsContainer eventID={id} style={{ height: "100%" }}/>