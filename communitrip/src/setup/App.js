
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
>>>>>>> d1c0c0ce5dc2507ada38ff41511b6ddfe30da47f

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={"/"} element={<LandingPage IsAuth={isAuth}/>}/>
      <Route exact path={"/login"} element={<LogInPage IsAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route exact path={"/signup"} element={<SignUpPage IsAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route exact path={"/event/test"} element={<EventDisplayPage IsAuth={isAuth}/>}/>
      <Route exact path={"/event"} element={<EventSearchPage IsAuth={isAuth}/>}/>
      <Route exact path={"/event/add"} element={<EventAddPage IsAuth={isAuth}/>}/>
      <Route exact path={"/event/:id"} element={<EventRouteManager IsAuth={isAuth}/>}/>
      <Route exact path={"/profile/:id"} element={<ProfileDashboard/>}/>
      <Route exact path={"/resetpassword"} element={<ResetPassword/>}/>
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
