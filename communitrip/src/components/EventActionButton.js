import { Link } from "react-router-dom"
import "./style/EventActionButton.css"

export default function EventActionButton({ buttonText }) {

    return (
        <div className={"add-event-button-container"}>
            <Link to={"/event/add"}>
                <button className="add-event-button" type="submit">+ {buttonText}</button>
            </Link>
        </div>
    )
}