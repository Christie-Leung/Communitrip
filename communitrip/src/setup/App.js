import logo from '../logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from 'react';
import LandingPage from '../pages/LandingPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import EventRouteManager from '../events/EventRouteManager';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={"/"} element={<LandingPage IsAuth={isAuth}/>}/>
      <Route exact path={"/login"} element={<LogInPage IsAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route exact path={"/signup"} element={<SignUpPage IsAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route exact path={"/event/:id"} element={<EventRouteManager IsAuth={isAuth}/>}/>
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
