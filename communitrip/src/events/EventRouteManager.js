import { useParams } from "react-router-dom";
import EventDisplayPage from "./EventDisplayPage";

export default function EventRouteManager() {
    let params = useParams();
    let eventid = params.eventid;
    
    return <EventDisplayPage eventID={eventid}/>

}