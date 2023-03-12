import { useEffect, useRef, useState } from "react";
import { API_KEY, db } from "../setup/Firebase-config";
import "../pages/style/ChatPage.css"
import ParticipantsContainer from "./ParticipantsContainer";
import { collection, getDoc, query, where } from "@firebase/firestore";

export default function ChatBoxView({ chatID, hideSideBar, containerStyle, leftContainerStyle }) {

    const [userMessage, setUserMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [typing, setTyping] = useState(false);

    // const name = localStorage.getItem("user");
    const name = "Christie"

    const [event, setEvent] = useState(null);
    const eventCollectionRef = collection(db, "Events");

    useEffect(() => {
        const getEventInfo = async () => {
            const q = query(eventCollectionRef, where("id", "==", chatID));
            const doc_refs = await getDoc(q);

            const res = []
            
            doc_refs.forEach((doc) => {
                res.push({
                    docID: doc.id,
                    ...doc.data()
                })
            })
            setEvent(res[0]);
        };
        getEventInfo()
    });

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

        if (userMessage.includes("plan") || userMessage.includes("where to go")) {
            callOpenAIAPI();
        } else {
            await processMessageToChatGPT(userMessage).then(() => {
                console.log(messageHistory);
            });
        }
    }


    const duration = event ? (event.duration < 5 ? event.duration : 3) : "3";
    const location = event ? (event.location) : "Vancouver";
    const budget = event ? (event.budget) : "50";

    //const travelMethod = event.travelMethod
    const travelMethod = "car"

    async function callOpenAIAPI() {

        const APIBody = {
            "model": "text-davinci-003",
            "prompt": "Pretend to be a travel enthusiat, make a" 
                        + duration + " day travel plan to " + location + ". " 
                        + "Include flights (if needed), hotels (if needed), restaurants (if needed),"
                        + " activities with estimated cost and an overall estimated cost." 
                        + `${ budget ? "The budget per person is " + budget + ".": "" }`
                        + " Make sure to optimize travel time using the " + travelMethod + " as travelling method.",
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
            "prompt": "Answer positively and pretend to be a travel enthusiast "
                        + "without saying you are one. Do not complete the sentence. "
                        + `${ event ? `You are given the following information about a planned vacation trip. Location: ${event.location}, Budget: ${event.cost}, description: ${event.description}, number of people going: ${event.numGuest}, duration: ${event.duration}.` : "" }` +
                        "Use this information to respond as a helper in suggesting ideas for the plan while trying to learn about " 
                        + " their personalities to make more suitable suggestions. Make it more conversational like a friend rather than questioning: " + userInput,
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
        <div className="chat-full-container-view" style={containerStyle}>
            <div className="chat-left-container-view" style={leftContainerStyle}>
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
            { hideSideBar ? <></> : 
                <div className="chat-right-container-view">
                    <ParticipantsContainer bot={true} eventID={chatID} hideSideBar={false}
                        leftContainerStyle={{ width: "75%" }}/>
                </div>
            }
            
        </div>
    )
}