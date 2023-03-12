import NavBar from "../components/NavBar";
import cappadocia from "../components/cappadocia.png";
import { useState } from "react";
import * as React from 'react';
import './style/EventDisplayPage.css'
import FAQ from "./FAQ";
import ParticipantContainer from "../components/ParticipantsContainer"
import EventActionButton from "../components/EventActionButton";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { db } from "../setup/Firebase-config";
import { getStorage, ref, uploadBytes } from "@firebase/storage";
import { Link, useNavigate } from "react-router-dom";

export default function EventDisplayPage({ eventID }) {

  let navigate = useNavigate();


  const eventCollectionRef = collection(db, "Events");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const getEvent = async () => {
        const q = query(eventCollectionRef, where("id", "==", eventID));
        const doc_refs = await getDocs(q);

        const res = []
        
        doc_refs.forEach((doc) => {
            res.push({
                docID: doc.id,
                ...doc.data()
            })
        })
        setEvent(res[0]);
        if (event) {
          setLoading(false);
      }
    };
    getEvent();
})

    const userID = localStorage.getItem("userUID")
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
      console.log("success!")
      navigate(`/event/${eventID}`)
  }

    const updateEventInfo = async () => {
      updateUserProfile();
      const updateEvent = async () => {
          const q = query(usersCollcectionRef, where("id", "==", eventID));
          const doc_refs = await getDoc(q);

          const res = []
          
          doc_refs.forEach((doc) => {
              res.push({
                  docID: doc.id,
                  ...doc.data()
              })
          })
          
          const eventRef = doc(db, "Events", res[0].docID);

          await updateDoc(eventRef, {
              participants: [...eventRef.participants, userID]
          })
      };
      updateEvent();
      console.log("success!")
    }


    const [faqs, setFaqs] = useState([
        {
          question: "What is included in the package?",
          answer:
            "Air-conditioned vehicle, snacks, and flight certificate will be provided. We will depart at Goreme and pass by Goreme National Park and Goreme town center. Fly close to see beautiful valleys and rock formations.  ",
          open: false
        },
        {
          question: "Are there safety policies for the trip?",
          answer: "Yes, we do temperature check before the ride and require COVID-19 proof of vaccinnation.",
          open: false
        },
        {
          question:
            "What if I want to cancel the trip?",
          answer: "For a full refund, cancel at least 24 hours before the start date.",
          open: false
        }
      ]);
    
      const toggleFAQ = index => {
        setFaqs(
          faqs.map((faq, i) => {
            if (i === index) {
              faq.open = !faq.open;
            } else {
              faq.open = false;
            }
    
            return faq;
          })
        );
      };

      return (
        <>
        { loading ? <></> :
            <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
            }}>
              <div className="view">
                <div className="header-container">
                        <NavBar page={"signup"}/>
                </div>

                <div className="event_title">
                    <h1>{ event.title ? event.title : "Explore Cappadocia" }</h1>
                </div> 
                <div className="event-page-subcontainer">
                  <div className="event-page-left-container">
                    <div className="event_subtitle">
                        <h3>{ event.description ? event.description : "Cappadocia Balloon Flights from Discovery Balloons" }</h3>
                    </div> 

                    <div className="event_photo">
                        <img className="event_photo_image" src={ false ? event.image : cappadocia} alt="Logo"/>
                    </div>
                  </div>
                  <div className="event-page-right-container">
                    <div className="participant-header-title">
                      <text>Participants</text>
                    </div>
                    <ParticipantContainer 
                      textStyle={{ color: "#000", fontWeight: "500" }}
                      profileStyle={{ backgroundColor: "#fff" }}
                      containerStyle={{ width: "70%", marginTop: "1.2vw" }}
                      eventID={eventID}
                      bot={false}/>
                      <div className="event-group-chat">
                          <Link to={`/chat/${eventID}`}>
                              <button type="submit" className="event-join-group-chat-button">Join Chat!</button>
                          </Link>
                      </div>
                  </div>
                </div>
                <div className="event_summary">
                      <p> - Location: { event.location ? event.location : "Town center of Goreme, Cappadocia"} <br></br>
                          - Date/Duration: { event.date ? event.date : "April 4th, 2023"} for {event.duration ? event.duration : "3"} hours <br></br>
                          - Estimated Cost: { event.cost ? event.cost : "250"} CAD <br></br>
                          { false ? `- Leader/Guide: ${event.leader}` : "- Leader/Guide: Jackie"}</p>
                  </div>

                <div className="event_description">
                    <h2>Description</h2>
                        <p> { event.description ? event.description : "Take in the beauty of Cappadocia's landscape with a sunrise balloon flight. Travel comfortably to the launch site in an air-conditioned vehicle as the crew inflate the hot air balloon. As you float higher in a balloon flown by an experienced pilot, admire the volcanic rock formations and fairy chimneys that dot the landscape and the valleys that cut through the scenery."}
                        </p>
                </div>

                <div className="faqs">
                    <h2>FAQ</h2>
                    {faqs.map((faq, index) => (
                    <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
                <EventActionButton action={updateEventInfo} buttonText="Join Event"/>
              </div>
            </div>
        }
        </>
    );
}