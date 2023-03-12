import { useState } from "react";
import NavBar from "../components/NavBar";
import FAQ from "../events/FAQ";

export default function FaqPage() {

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

    return(
        <>
        <div className="window-container" style={{
                backgroundColor: "white",
                overflowY: "scroll",
                overflowX: "hidden",
        }}>
          <div className="view">
            <div className="header-container">
                    <NavBar page={"faq"}/>
            </div>
            <div className="faqs">
                <h2>FAQ</h2>
                {faqs.map((faq, index) => (
                <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                ))}
            </div>
        </div>
    </div>
    </>
    )
}