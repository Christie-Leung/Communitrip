import openai from "openai";
import { useState } from "react";
/*
const response = await openai.createCompletion({
    model: FINE_TUNED_MODEL
    prompt: YOUR_PROMPT,
  });*/

const API_KEY = "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"

//const duration = event.duration;
const duration = "460000"

//const location = event.location;
const location = "Vancouver"

//const budget = event.budget
const budget = "";

//const travelMethod = event.travelMethod
const travelMethod = "car"

async function callOpenAIAPI() {

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": "Pretend to be a travel enthusiat, make a " + duration 
                    + " day travel plan to " + location + " in an excel sheet format. " 
                    + "Include flights (if needed), hotels (if needed), restaurants (if needed),"
                    + " activities with estimated cost and an overall estimated cost." 
                    + `${ budget ? "The budget per person is " + budget + ".": "" }`
                    + " Make sure to optimize travel time using the " + travelMethod + " as travelling method.",
        "temperature": 0,
        "max_tokens": 640,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
      }

    await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(APIBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        return data; // Positive or negative
      });
}

export default function PlannerAI({ event }) {

    //const duration = event.duration;
    const duration = "460000"

    //const location = event.location;
    const location = "Vancouver"

    //const budget = event.budget
    const budget = "";

    //const travelMethod = event.travelMethod
    const travelMethod = "car"

    const [message, setMessage] = useState("");

    async function callOpenAIAPI() {

        const APIBody = {
            "model": "text-davinci-003",
            "prompt": "Pretend to be a travel enthusiat, make a " + duration 
                        + " day travel plan to " + location + " in an excel sheet format. " 
                        + "Include flights (if needed), hotels (if needed), restaurants (if needed),"
                        + " activities with estimated cost and an overall estimated cost." 
                        + `${ budget ? "The budget per person is " + budget + ".": "" }`
                        + " Make sure to optimize travel time using the " + travelMethod + " as travelling method.",
            "temperature": 0,
            "max_tokens": 640,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
          }

        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(APIBody)
          }).then((data) => {
            return data.json();
          }).then((data) => {
            console.log(data);
            setMessage(data); // Positive or negative
          });
        return message;
    }

    const sendMessage = async (message) => {
        try {
            const response = await openai.Completion.create({
                engine: 'text-davinci-003',
                prompt: message,
                maxTokens: 150,
                n: 1,
                stop: '\n',
                temperature: 0.7,
            });
                
            const botMessage = response.data.choices[0].text.trim();
            return botMessage;
        } catch (error) {
            console.error(error);
        }
    }


}