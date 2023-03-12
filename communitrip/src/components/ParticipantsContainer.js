import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../setup/Firebase-config";
import SideProfileView from "./SideProfileView";
import "./style/ParticipantsContainer.css"


export default function ParticipantsContainer({ eventID, containerStyle, profileStyle, textStyle, bot}) {


    const userCollectionRef = collection(db, "Users")
    const eventsCollectionRef = collection(db, "Events")

    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);

    const getEvent = async () => {

        const q = query(eventsCollectionRef, where("id", "==", eventID));
        const doc_refs = await getDocs(q);

        const res = []
        
        doc_refs.forEach((doc) => {
            res.push({
                docID: doc.id,
                ...doc.data()
            })
        })
        setEvent(res[0])
        console.log(event);
        res[0].participants.forEach((id) => {
            getUser(id);
        })
    };
    getEvent();
    
    const getUser = async (userID) => {

        const q = query(userCollectionRef, where("id", "==", userID));
        const doc_refs = await getDocs(q);

        const res = []
        
        doc_refs.forEach((doc) => {
            res.push({
                docID: doc.id,
                ...doc.data()
            })
        })
        if (!users.some(user => user.id === res.at(0).id)){
            setUsers([ ...users, res.at(0)])
            console.log(users);
        }
    };
    getUser();

    if (!eventID) {
        return (
            <div className="participants-side-container" style={containerStyle}>
                <SideProfileView profile={"1"} profileStyle={profileStyle} 
                        textStyle={textStyle}/>
                <SideProfileView profile={"2"} profileStyle={profileStyle} 
                        textStyle={textStyle}/>
                { bot ? 
                <SideProfileView profile={"bot"} profileStyle={profileStyle} 
                textStyle={textStyle}/> : <></> }
            </div>
        )
    } 

    return (
        <div className="participants-side-container" style={containerStyle}>
            { users.map((user) => {
                return (
                    <SideProfileView profile={user} profileStyle={profileStyle} 
                        textStyle={textStyle}/>
                )
            })}
            { bot ? 
                <SideProfileView profile="bot" profileStyle={profileStyle} 
                textStyle={textStyle}/> : <></> }
        </div>
    ) 
}
