import NavBar from "../components/NavBar";
import cappadocia from "../components/cappadocia.png";
import { useState } from "react";
import * as React from 'react';
import './style/EventDisplayPage.css'
import FAQ from "./FAQ";
import ParticipantContainer from "../components/ParticipantsContainer"

export default function EventDisplayPage({ eventID, IsAuth }) {

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
                    <h1> Explore Cappadocia </h1>
                </div> 
                <div className="event-page-subcontainer">
                  <div className="event-page-left-container">
                    <div className="event_subtitle">
                        <h3> Cappadocia Balloon Flights from Discovery Balloons </h3>
                    </div> 

                    <div className="event_photo">
                        <img className="event_photo_image" src={cappadocia} alt="Logo"/>
                    </div>
                  </div>
                  <ParticipantContainer eventID={eventID}/>
                </div>
                <div className="event_summary">
                      <p> - Location: Town center of Goreme, Cappadocia <br></br>
                          - Date/Duration: April 4th, 2023 for three hours <br></br>
                          - Estimated Cost: 250 CAD <br></br>
                          - Leader/Guide: Jackie </p>
                  </div>

                <div className="event_description">
                    <h2>Description</h2>
                        <p> Take in the beauty of Cappadocia’s landscape with a sunrise balloon flight. Travel comfortably to the launch site in an air-conditioned vehicle as the crew inflate the hot air balloon. As you float higher in a balloon flown by an experienced pilot, admire the volcanic rock formations and fairy chimneys that dot the landscape and the valleys that cut through the scenery.
                        </p>
                </div>

                <div className="faqs">
                    <h2>FAQ</h2>
                    {faqs.map((faq, index) => (
                    <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
              // Event join button
              // Event profile
              </div>
            </div>
        </>
    );
}