import { useParams } from "react-router-dom";
import ChatPage from "./ChatPage";

export default function ChatRouteManager() {
    let params = useParams();
    let chatid = params.chatid;
    
    return <ChatPage chatID={chatid}/>
}