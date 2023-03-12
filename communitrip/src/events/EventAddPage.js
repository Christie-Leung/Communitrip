import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {db, storage} from "../setup/Firebase-config";
import "./style/EventAddPage.css"
import "./style/Calendar.css"
import React, {Component} from 'react';
import Calendar from "react-calendar";
import { addDoc, collection, doc, getDoc, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from 'uuid';

import "./style/EventDisplayPage.css";
import { uuidv4 } from "@firebase/util";
import ChatBoxView from "../components/ChatBoxView";

export default function EventAddPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [leader, setLeader] = useState("");
    const [location, setLocation] = useState("");
    const [numGuest, setNumGuest] = useState("");
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState("");

    const [eventID, setEventID] = useState(null);

    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const [date, setDate] = useState("");
    const [date2, setDate2] = useState(new Date());


    let navigate = useNavigate();

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);

        let selected = event.target.files[0];
        const types = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']

        if (selected && types.includes(selected.type)) {
            setFile(file);
            uploadImage(file);
        } else {
            setFile(null);
            setError('Please select a valid image file type (png / jpeg / webp / jpg)');
        }
      };

    const uploadImage = (file) => {
        console.log(file);

        const storage = getStorage();

        const storageRef = ref(storage, `/profilePictures/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('uploaded file')
        }, async() => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
            console.log(url);
        })
    }

    const [progress, setProgress] = useState("");
    const [url, setUrl] = useState("");

    const userID = localStorage.getItem("userUID");

    const eventCollectionRef = collection(db, "Events");

    const createEvent = async () => {
        let uuid = uuidv4();
        updateUserProfile(uuid);
        await addDoc(eventCollectionRef,
            {
                id: uuid,
                title: title,
                description: description,
                leader: userID,
                numGuest: numGuest,
                participants: [ userID ],
                location: location,
                duration: duration,
                date: date, 
                cost: cost,
                image: url
            }).catch((err) => {
                console.log(err);
                setError(err);
            }).then((doc) => {
                console.log(doc);
                navigate(`/event/${uuid}`);
            })

        

    }

    const usersCollcectionRef = collection(db, "Users")

    const updateUserProfile = async (uuid) => {
        const updateUser = async () => {
            const q = query(usersCollcectionRef, where("id", "==", userID));
            const doc_refs = await getDoc(q);
    
            const res = []
            
            doc_refs.forEach((doc) => {
                res.push({
                    docID: doc.id,
                    ...doc.data()
                })
            })
            
            const userRef = doc(db, "Users", res[0].docID);

            await updateDoc(userRef, {
                event: [...userRef.event, uuid]
            })
        };
        updateUser();
    }

    return (
        <>
         <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
            }}>

                <div className="view">
                    <div className="header-container">
                        <NavBar page={"event"}/>
                    </div>

                    <div className="event_title">
                        <h1>Add Your Event</h1>
                    </div> 

                    <div className="create-event-full-container">
                        <div className="create-event-left-container">
                            <img src={image} className="event-picture-container" alt=""/>
                            <div className="event-status-container">
                            <label htmlFor="event-image-input" className="custom-file-upload">
                                Upload Image(s)
                            </label>
                                <input id="event-image-input" className="event-upload-picture" type="file" multiple onChange={handleFileInputChange}/>
                            </div>
                            { error ?
                                    <>
                                        <text className="event-invalid">{error}</text>
                                    </> : <></>
                                }
                            
                        </div>
                        <div className="create-event-right-container">
                        
                            <div className="event-input-container">
                                <input className="event-input" type="text" placeholder="Event Title"
                                 onChange={(event) => {
                                    setTitle(event.target.value);
                                 }}
                                ></input>
                                <input className="event-input" type="text" placeholder="Location"
                                onChange={(event) => {
                                    setLocation(event.target.value);
                                 }}
                                 ></input>
                            </div>

                            <div className="event-input-container">
                                <input className="event-input" type="date" placeholder="Date"
                                onChange={(event) => {
                                    setDate(event.target.value);
                                 }}
                                 ></input>
                                <input className="event-input" type="number" placeholder="Duration(Days)"
                                onChange={(event) => {
                                    setDuration(event.target.value);
                                 }}
                                 ></input>
                            </div>

                            <div className="event-input-container">
                            <input className="event-input" type="number" placeholder="Number of Guests"
                            onChange={(event) => {
                                setNumGuest(event.target.value);
                             }}
                            ></input>
                            <input className="event-input" type="number" placeholder="Estimated Cost(CAD)"
                            onChange={(event) => {
                                setCost(event.target.value);
                             }}
                            ></input>
                            </div>

                            <div className="seperator"/>
                            <div className="event-long-input-container">
                                <label className="event-input-label">Event Description</label>
                                <textarea className="profile-long-input" placeholder="Tell us about the event you are planning!" style={{ minHeight: "min(10vw, 20vh)" }}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                 }}
                                 />
                            </div>
                            <div style={{ display: "flex", justifyContent: "end"}}>
                                {error ? <text className="profile-invalid">{error}</text> : <></>}
                                    <button type="submit" className="event-add-button" 
                                    onClick={() => {
                                        console.log(description, numGuest, location, duration, date, cost)
                                        createEvent() }}
                                    >Add Event</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "2vh", display: "flex" }}>
                        <div className="bottom-left-container">
                            <div className="calendar-view-container">
                                <div className='react-calendar'>
                                    <text className='calendar-header'>React Calendar</text>
                                    <div className='calendar-container'>
                                        <Calendar onChange={setDate2} value={date2} />
                                    </div>
                                    <p className='text-center'>
                                        <span className='bold'>Selected Date:</span>{' '}
                                        {date2.toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-right-container">
                            <ChatBoxView hideSideBar={true} 
                            containerStyle={{ height: "42vw", marginTop: "min(3vw, 3vh)" }} 
                            leftContainerStyle={{ width: "100%", backgroundColor: "#2b2b2b"}}/>
                        </div>
                    </div>
                    </div>
                </div>                        
        </>
    )
}