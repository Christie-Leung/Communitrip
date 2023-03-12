import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./style/EventAddPage.css"
import "./style/Calendar.css"
import React, {Component} from 'react';
import Calendar from "react-calendar";


import "./style/EventDisplayPage.css";

export default function EventAddPage({ IsAuth, setIsAuth }) {

    const [eventTitle, setEventTitle] = useState("");
    const [eventLocation, setLocation] = useState("");
    const [eventDuration, setDuration] = useState("");
    const [eventCost, setCost] = useState("");

    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false) 

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
                                <input className="event-input" type="text" placeholder="Event Title"></input>
                                <input className="event-input" type="text" placeholder="Location"></input>
                            </div>

                            <div className="event-input-container">
                                <input className="event-input" type="date" placeholder="Date"></input>
                                <input className="event-input" type="number" placeholder="Duration(Days)"></input>
                            </div>

                            <div className="event-input-container">
                            <input className="event-input" type="number" placeholder="Number of Guests"></input>
                            <input className="event-input" type="number" placeholder="Estimated Cost(CAD)"></input>
                            </div>

                            <div className="seperator"/>
                            <div className="event-long-input-container">
                                <label className="event-input-label">Event Description</label>
                                <textarea className="profile-long-input" placeholder="Tell us about the event you are planning!" style={{ minHeight: "min(10vw, 20vh)" }}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "end"}}>
                                <Link to={`/event/{id}`}>
                                    <button type="submit" className="event-add-button">Add Event</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="calendar-view-container">
                        <div className='react-calendar'>
                        <text className='calendar-header'>React Calendar</text>
                        <div className='calendar-container'>
                            <Calendar onChange={setDate} value={date} />
                            </div>
                            <p className='text-center'>
                                <span className='bold'>Selected Date:</span>{' '}
                                {date.toDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}