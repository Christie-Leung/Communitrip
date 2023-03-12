import React from "react";
import { Link } from "react-router-dom";
import "./style/Card.css";

function Card({eventID, src, title, description}) {
    
    return (
        <Link to={`/event/${eventID}`}>
            <div className="card">
                <div className="trim">
                    <img src={src} alt=""/>
                </div>
                <div className="card_info">
                    <h2>{title}</h2>
                    <h4>{description}</h4>
                </div>
            </div>
        </Link>
    )
}

export default Card;