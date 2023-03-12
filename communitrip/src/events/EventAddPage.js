import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {db, storage} from "../setup/Firebase-config";
import "./style/EventAddPage.css"
import "./style/Calendar.css"
import React, {Component} from 'react';
import Calendar from "react-calendar";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from 'uuid';

import "./style/EventDisplayPage.css";
import { uuidv4 } from "@firebase/util";

export default function EventAddPage({ IsAuth, setIsAuth }) {

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
        } else {
            setFile(null);
            setError('Please select a valid image file type (png / jpeg / webp / jpg)');
        }
      };

    const [progress, setProgress] = useState("");
    const [url, setUrl] = useState("");

    const eventCollectionRef = collection(db, "Events");

    const createEvent = async () => {
        await addDoc(eventCollectionRef,
            {
                id: uuidv4(),
                title: title,
                description: description,
                // leader: leader,
                numGuest: numGuest,
                // participants: [],
                location: location,
                duration: duration,
                date: date, 
                cost: cost
                // imagePicture: url
            }).catch((err) => {
                console.log(err);
            }).then((doc) => {
                console.log(doc);
            })

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
                        <NavBar page={"signup"} IsAuth={IsAuth}/>
                    </div>

                    <div className="event_title">
                        <h1> Add Your Event </h1>
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
                                    <button type="submit" className="event-add-button" 
                                    onClick={() => {
                                        console.log(description, numGuest, location, duration, date, cost)
                                        createEvent() }}
                                    >Add Event</button>
                            </div>
                        </div>
                    </div>
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
            </div>
        
        </>
    )
}