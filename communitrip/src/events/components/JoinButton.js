import React from "react";
import "./JoinButton.css";
import { useState } from "react";
import { updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { db } from "../../setup/Firebase-config";

function JoinButton({userId}) {
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState('JOIN');
    const eventID_placeholder = 1;
    const userCollectionRef = collection(db, "Users");
    const EventCollectionRef = collection(db, "Events");

    const updateEvent = async () => {
            console.log("Document written with ID: ", userId);
            console.log("I've been clicked");
            setDisabled(true);
            setText('JOINED')
            await updateDoc(EventCollectionRef, {participants: arrayUnion(userId)});
            await updateDoc(userCollectionRef, {events: arrayUnion(eventID_placeholder)});
    };
    return (
        <div>
            <button 
            className="button" 
            type="button" 
            disabled={disabled} 
            onClick={updateEvent}>
                {text}
                </button>
        </div>
    );
}

export default JoinButton;