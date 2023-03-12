//import cohere from "cohere-ai";
import axios from 'axios';

//const cohere = require('cohere-ai');
axios.init('Yjcs2boCKiiXw8EenTWJ5DRivdNhNYWlrmF45PHj')

export const examples = [
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
const cities = ['Paris', 'Tokyo', 'Vancouver'];
const account_page = '';
const event_page = '';
const city_page = '';
const policy_page = '';
const user_info = false;

 
async function classifyText(input) {
    const response = await axios.classify({
        inputs: [input],
        examples: examples
    });
  
    console.log(response.body.classifications[0]);
    const label = response.body.classifications[0].prediction;
    const confidence = response.body.classifications[0].confidence;
    //const labels = response.body.classifications[0].labels;
    generateResponse(label, confidence, input);

    //console.log(response.body)
    return response.body.classifications[0];
  }


async function generateText(input) {
const response = await axios.generate({
  prompt: input,
  model: 'command-xlarge-nightly',
  max_tokens: 100,
  temperature: 0.9,
  k: 0,
  p: 0.75,
  stop_sequences: [],
  return_likelihoods: 'NONE'
});
  console.log(response.body.generations[0].text);
  //return response.body,generations[0].text;
}

  function checkCity(input) {
    var city = '';
    for (let i = 0; i < cities.length; i++) {
      if (input.includes(cities[i])) {
        city = cities[i];
      }
    }
    if (city) {
      //appendMessage('bot', "Just want to make sure, you are interested in the event of ${city}?")
      return city;
    } else {
      //appendMessage('bot', "Sorry, could you please tell us the city you are interested?")
      console.log("Sorry, could you please tell us the city you are interested?");
      //city = awaitUser();
      city = 'Paris';
      return city;
    }
  }


  //TODO
  function awaitUser() {
    console.log()
    return "Paris";
  }


  async function generateResponse(label, confidence, input) {
    const output = '';
    const def = "Sorry, could you please elaborate more? Feel free provide more specific keywords(e.g. Event ID...)";
    if (!checkConfidence(confidence)) {
      return def; 
    } else {
      switch(label) {
        case 'account page':
        return "Please direct to ${LogIn_page} for log in, set up the account for Communitrip. You could log in or set up using email or Gmail account.";

        case 'event page':
        return "Please direct to ${event_page} to seek out more interesting events we have in Communitrip! You could get start with the city you have on mind...";

        case 'city page':
        const city = checkCity(input);
        
        var qs = 'Give a sentence that descirbe ' + city
        console.log(qs)
        const response = generateText(qs);
        return response + " Please direct to ${city_page} to discover a list of events of #{city} in Communitrip.";

        case 'Policy page':
        return "Please direct to ${policy_page} for more information.";

        case 'cancel policy':
        return "Our cancellation policy allows you to cancel your booking up to 24 hours before the scheduled start time without penalty. If you cancel " + 
        "within 24 hours of the start time, we will charge a cancellation fee of 50% of the total cost of your booking. If you fail to show up for your booking " + 
        "without cancelling, you will be charged the full cost of the booking. For more information, please visit ${policy_page}.";

        case 'profile page':
        if (user_info) {
          return "Please direct to ${user_info} to edit your profile, personal information, and event information.";
        } else {
          return "Please log in/register for more information. Direct to: ${account_page)."
        }
        
        case 'general':
        return generateText(input);

        //TODO: get the list of events
        case 'past-events':
        return "To create a event, please direct to ${event} page. "

        //TODO: specific events
        case 'specific events':
        return " "

       }
    }
  
  }

  function checkConfidence(confidence) {
    if (confidence >= 0.6) {
      return true;
    } else {
      return false;
    }
  }



  var clas = classifyText('I am interested in Paris')
  //generateText('Could you give me more information about Paris because I will travel there.')
  console.log(clas)
  //generateResponse(clas)


