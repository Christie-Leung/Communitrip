import { useEffect, useRef, useState } from "react";
import PlannerAI from "../ai/plannerAI";
import NavBar from "../components/NavBar";
import "./style/ChatPage.css"

const API_KEY = "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"

export default function ChatPage({ id }) {

    const [userMessage, setUserMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [typing, setTyping] = useState(false);

    // const name = localStorage.getItem("user");
    const name = "Christie"

    const updateMessageHistory = (message, sender) => {
        setMessageHistory(messageHistory => [...messageHistory, {
                message: message,
                sender: sender
        }])
    }

    const handleChatSubmit = async () => {
        
        updateMessageHistory(userMessage, name);
        setUserMessage("");

        setTyping(true);
        await processMessageToChatGPT(userMessage).then(() => {
            console.log(messageHistory);
        });
        
        //callOpenAIAPI();
    }

    //const duration = event.duration;
    const duration = "2"

    //const location = event.location;
    const location = "Vancouver"

    //const budget = event.budget
    const budget = "";

    //const travelMethod = event.travelMethod
    const travelMethod = "car"

    async function callOpenAIAPI() {

        const APIBody = {
            "model": "text-davinci-003",
            "prompt": "Pretend to be a travel enthusiat, make a 5 column spreadsheet of a" 
                        + duration + " day travel plan to " + location + " in an excel sheet format. " 
                        + "Include flights (if needed), hotels (if needed), restaurants (if needed),"
                        + " activities with estimated cost and an overall estimated cost." 
                        + `${ budget ? "The budget per person is " + budget + ".": "" }`
                        + " Make sure to optimize travel time using the " + travelMethod + " as travelling method."
                        + "Activity Name | Day | Time | Estimated Cost | Short Description",
            "temperature": 0.05,
            "max_tokens": 1200,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        }

        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(APIBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(messageHistory);
            updateMessageHistory(data.choices[0].text, "CommuniTrip AI")
            console.log(messageHistory);
            return data; 
        });

    }

    const processMessageToChatGPT = async (userInput) => {
        const resquestBody = {
            "model": "text-davinci-003",
            "prompt": "Answer positively and pretend to be a travel enthusiast"
                        + "without saying you are one. Do not complete the sentence. Provide an answer, explanation and respond "
                        + "to the following: " + userInput,
            "temperature": 0.2,
            "max_tokens": 640,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        }

        await fetch("https://api.openai.com/v1/completions", { 
                method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(resquestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log(messageHistory);
            updateMessageHistory(data.choices[0].text, "CommuniTrip AI")
            console.log(messageHistory);
            return data; // Positive or negative
        });
        }



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
                        <div className="chat-full-container-view">
                            <div className="chat-left-container-view">
                                <div className="chat-message-history-container">
                                    { messageHistory.map((msg) => {
                                        return (
                                            <div className="chat-message-container">
                                                <text className="chat-message-user-text">{msg.sender}</text>
                                                <text className="chat-message-text">{msg.message}</text>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="chat-input-container">
                                    <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(event) => {
                                        setUserMessage(event.target.value)
                                        
                                    }}
                                    className="chat-input"
                                    placeHolder="Message the group"
                                    />
                                    <button className="chat-submit-button" type="submit" onClick={handleChatSubmit}>Send</button>
                                </div>
                            </div>
                            <div className="chat-right-container-view">
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
    )
}

// add <ParticipantsContainer eventID={id} style={{ height: "100%" }}/>