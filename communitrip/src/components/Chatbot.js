import React, { useState, useRef, useEffect } from "react";
//import Cohere from 'cohere-ai';
import './style/chatbot.css'
//import {examples} from './func.js'
import axios from 'axios';






export default function Chatbot() {
  const start = 'Hey, welcome to Communitrip! How can I help you?';
  const startMessage = { user: 'Bot', text: start};
  const [userInput, setUserInput] = useState('');
  const [chatbotInput, setChatBotInput] = useState('');
  const [chatbotLabel, setLabel] = useState('');
  const [confidence, setConfidence] = useState('');
  const [gen, setGen] = useState('');
  const [messages, setMessages] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const chatEndRef = useRef(null);
  const def = "Sorry, could you please elaborate more? Feel free provide more specific keywords(e.g. Event ID...)";


 const cities = ['Paris', 'Tokyo', 'Vancouver'];
 const account_page = '';
 const event_page = '';
 const city_page = '';
 const policy_page = '';
 const user_info = false;
 //var chatbotInput = null;
 

 const getLabel = async (ui) => {
const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/v1/classify',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer Yjcs2boCKiiXw8EenTWJ5DRivdNhNYWlrmF45PHj'
  },
  data: {
    inputs: ui,
    examples: examples,
    truncate: 'END'
  }
};

 await axios
  .request(options)
  .then(function (response) {
    setLabel(response.data.classifications[0].prediction);
     //console.log("this" , response.data.classifications[0]);
     //const newMessage = { user: 'Bot', text: chatbotInput};
     //setMessages([...messages, newMessage]);
     setConfidence(response.data.classifications[0].confidence);
  })
  .catch(function (error) {
    setChatBotInput(def);
   console.error(error);
  });
 }


 const getGen = async (ui) => {
const options = {
  method: 'POST',
  url: 'https://api.cohere.ai/v1/generate',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer Yjcs2boCKiiXw8EenTWJ5DRivdNhNYWlrmF45PHj'
  },
  data: {
    model: 'command-xlarge-nightly',

    max_tokens: 100,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    stop_sequences: [],
    return_likelihoods: 'NONE',
    prompt: ui,
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
}





 const generateResponse = async (ui) => {
        const input = [];
        //console.log(ui);
        input.push(ui);
        console.log(input);
        await getLabel(input);
        console.log(chatbotLabel);
        console.log(confidence);
        generateNextStep(chatbotLabel);
        console.log(chatbotInput);
        //setChatBotInput('Is there any thing I can help you with?');
        return chatbotInput;
      };

      
    
const handleButtonClick = async() => {
  console.log(messages);
  const newMessage = { user: 'User', text: userInput};
  setMessages([...messages, newMessage]);
      // const response = generateResponse(userInput);
      // console.log(response);
  const re = await generateResponse(userInput);
  console.log(re);
  setChatBotInput(re);
  const returnMessage = { user: 'Bot', text: chatbotInput};
  setMessages([...messages, returnMessage]);
        // setChatHistory([...chatHistory, { type: 'user', text: userInput }]);
        // setChatHistory([...chatHistory, { type: 'bot', text: response }]);
        setUserInput('');
      };


function checkCity(input) {
        var city = '';
        for (let i = 0; i < cities.length; i++) {
          if (userInput.includes(cities[i])) {
            city = cities[i];
          }
        }
        
        if (city) {
          //appendMessage('bot', "Just want to make sure, you are interested in the event of ${city}?")
          console.log(city);
          return city;
        } else {
          //appendMessage('bot', "Sorry, could you please tell us the city you are interested?")
          
          setChatBotInput("Sorry, could you please tell us the city you are interested?");
          return city;
        }
      }



const generateNextStep = async (label) =>{
      if (confidence < 0.3) {
        console.log("Here is it");
        return def;
    } else {
      switch(label) {
        case 'account page':
        //return "Please direct to " + LogIn_page +"for log in, set up the account for Communitrip. You could log in or set up using email or Gmail account.";
        break;

        case 'event page':
        return "Please direct to " + event_page + " to seek out more interesting events we have in Communitrip! You could get start with the city you have on mind...";
        

        case 'city page':
        const city = checkCity(userInput);
        const qs = 'Give a sentence that descirbe ' + city + ".";
        console.log(qs);
        const inp = [];
          //console.log(ui);
          inp.push(qs);
        return "Please direct to " + city_page + " to discover a list of events of #{city} in Communitrip.";
        

        case 'Policy page':
        return "Please direct to " + policy_page + "for more information.";
      

        case 'cancel policy':
        return  "Our cancellation policy allows you to cancel your booking up to 24 hours before the scheduled start time without penalty. If you cancel " + 
        "within 24 hours of the start time, we will charge a cancellation fee of 50% of the total cost of your booking. If you fail to show up for your booking " + 
        "without cancelling, you will be charged the full cost of the booking. For more information, please visit ${policy_page}.";
        

        case 'profile page':
        if (user_info) {
          return "Please direct to " + user_info + "to edit your profile, personal information, and event information.";
        } else {
          return  "Please log in/register for more information. Direct to: ${account_page)."
        }
        
        
        
        // //TODO: get the list of events
        // case 'past-events':
        // res = "To create a event, please direct to ${event} page. "
        // break;
        // //TODO: specific events
        // case 'specific events':
        // res = " "
        // break;

        default:
          const input = [];
        input.push(userInput);
        getGen(input);
        return gen;
}
    }
  }


const startQuery = ()=> {
  setIsButtonVisible(false);
  //setChatBotInput(start);
  setMessages([...messages, startMessage]);
  // console.log(chatbotInput);
  // console.log(messages);
  // console.log(userInput);


}


    
      useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      
      return (
        <>
          { isButtonVisible ?

            <div className="chat-closed-container"> 
              <button className="chat-image-container" 
              src={require("./chatbotIcon.jpeg")} onClick={handleButtonClick}/>
            </div>
          :  
          <div className="chat-box-header">
            <div className="chat-input-container"> 
              <input
                type="text"
                className="cohere-chat-input-text"
                value={userInput}
                onChange={(event) => 
                  setUserInput(event.target.value)
                }
                placeholder="Type your message here"/><button className="cohere-chat-button"onClick={handleButtonClick}>Send</button>
            </div> 
          </div>
            }
        </>
      );
}


function Message({ message }) {
  const isUser = message.user === 'User';
  const messageClass = isUser ? 'message user' : 'message bot'; // Add the CSS class based on the user

  return (
    <div className={messageClass}>
      {/* <img src={isUser ? userAvatar : botAvatar} alt={`${message.user} Avatar`} /> */}
      <p>{message.text}</p>
    </div>
  );
}



const examples = [
  //account page
  {text: 'how can i create a account?', label: 'account page'},
  {text: 'how do I sign in', label: 'account page'},
  {text: 'I want to register a account', label: 'account page'},
  {text: 'where is the log in page?', label: 'account page'},
  {text: 'how do i log in?', label: 'account page'},

  //Event page
  {text: 'Bring me to the events', label: 'event page'},
  {text: 'where could I get informaiton about event?', label: 'event page'},
  {text: 'what is the event looks like?', label: 'event page'},

  //city page
  {text: 'I am interested in', label: 'city page'},
  {text: 'I am planning to', label: 'city page'},
  {text: 'I want to book a trip in', label: 'city page'},
  {text: 'I want to go travel at', label: 'city page'},
  {text: 'would like to go', label: 'city page'},
  {text: 'I want to know more information about', label: 'city page'},
  {text: 'what are some events in', label: 'city page'},

  //Policy page
  {text: 'what if I cancel the event?', label: 'policy page'},
  {text: 'what penalty would I have if', label: 'policy page'},
  //Policy
  {text: 'what If I cancel the event?', label: 'cancel policy'},
  {text: 'I do not want to attend this event', label: 'cancel policy'},

  //profile
  {text: 'I want to change my profile', label: 'profile page'},
  {text: 'Direct me to the profile page', label: 'profile page'},
  {text: 'I want to change my interest', label: 'profile page'},
  {text: 'I want to edit my event', label: 'profile page'},

   //General question
   {text: 'What does Paris have?', label: 'general'},
   {text: 'Write me a travel plan on', label: 'general'},
   {text: 'what place of interest does... have?', label: 'general'},
   {text: 'Recommend me some', label: 'general'},
   {text: 'Where should I go in..', label: 'general'},
   //Event page
   {text: 'I want to create a event', label: 'event page'},
   {text: 'How should I start a event?', label: 'event page'},

   /*
  //person-specific
  {text: 'I want to know more information about myself', label: 'myself'},
  {text: 'what is my name', label: 'myself'},
  {text: 'what is my interest', label: 'myself'},
*/

//No, quite the call


//
  //past-events
  {text: 'Tell me the event I have registered', label: 'past-events'},
  {text: 'What is my event schedule', label: 'past-events'},

  //specific-event
  {text: 'What kind of activities do this event have', label: 'specific-event'},
  {text: 'What is the cost of this event?', label: 'specific-event'},
  {text: 'What is interesting about this event', label: 'specific-event'},

  //event-suggestions
  {text: 'Give me a event in paris that', label: 'event-suggestion'},
  {text: 'suggest me a event that ', label: 'event-suggestion'},
  {text: 'which event is', label: 'event-suggestion'}
]


