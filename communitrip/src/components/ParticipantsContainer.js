import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../setup/Firebase-config";
import SideProfileView from "./SideProfileView";
import "./style/ParticipantsContainer.css"

export default function ParticipantsContainer({eventID}) {

    const userCollectionRef = collection(db, "Users")
    const eventsCollectionRef = collection(db, "Events")

    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
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
        };
        getEvent();
        getUser();
    })

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
        setUsers([ ...users, res.at(0)])
        console.log(users);
    };

    return (
        <div className="participants-side-container">
            { users.map((user) => {
                return (
                    <SideProfileView profile={user}/>
                )
            })}
        </div>
    ) 
}
