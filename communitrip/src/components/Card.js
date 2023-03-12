import React from "react";
import "./style/Card.css";

function Card({src, title, description}) {
    return (
        <div className="card">
            <div className="trim">
                <img src={src} alt=""/>
            </div>
            <div className="card_info">
                <h2>{title}</h2>
                <h4>{description}</h4>
            </div>
        </div>
    )
}

export default Card;