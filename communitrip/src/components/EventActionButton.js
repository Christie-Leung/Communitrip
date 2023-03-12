import { Link } from "react-router-dom"
import "./style/EventActionButton.css"

export default function EventActionButton({ buttonText, link, action }) {

    return (
        <div className={"add-event-button-container"}>
            <Link to={link}>
                <button className="add-event-button" onClick={action} type="submit">+ {buttonText}</button>
            </Link>
        </div>
    )
}