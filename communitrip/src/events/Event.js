import React from "react";
import "./Event.css";
import {useState, useEffect } from "react";
import JoinButton from "./components/JoinButton";
import { collection} from "firebase/firestore";
import { db } from "../setup/Firebase-config";

export const EventCollectionRef = collection(db, "events");

function Event({image, name, description}) {

    return (
        <div style={{backgroundColor: "turquoise"}}>
        <h1>{name}</h1>
        <p>{description}</p>
        <img 
        className="image"
        src={image}
        />
        <JoinButton/>

        </div>
    );
}

export default Event