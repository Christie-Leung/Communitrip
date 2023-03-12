import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from 'react';
import LandingPage from '../pages/LandingPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import EventRouteManager from '../events/EventRouteManager';
import EventSearchPage from "../events/EventSearchPage";
import EventDisplayPage from '../events/EventDisplayPage';
import EventAddPage from '../events/EventAddPage';
import ProfileDashboard from '../pages/ProfileDashboard';
import ResetPassword from '../pages/ResetPassword';
import ChatPage from '../pages/ChatPage';
import FaqPage from '../pages/FaqPage';
import ChatRouteManager from '../pages/ChatRouteManager';

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={"/"} element={<LandingPage/>}/>
      <Route exact path={"/login"} element={<LogInPage/>}/>
      <Route exact path={"/signup"} element={<SignUpPage/>}/>
      <Route exact path={"/event/test"} element={<EventDisplayPage/>}/>
      <Route exact path={"/trips"} element={<EventSearchPage/>}/>
      <Route exact path={"/event/add"} element={<EventAddPage/>}/>
      <Route exact path={"/event/:eventid"} element={<EventRouteManager/>}/>
      <Route exact path={"/profile/:id"} element={<ProfileDashboard/>}/>
      <Route exact path={"/resetpassword"} element={<ResetPassword/>}/>
      <Route exact path={"/chat/test"} element={<ChatPage/>}/>
      <Route exact path={"/chat/:chatid"} element={<ChatRouteManager/>}/>
      <Route exact path={"/faq"} element={<FaqPage/>}/>
      <Route exact path={"*"} element={
            <>
                <main>This page does not exist!</main>
            </>
        }/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;