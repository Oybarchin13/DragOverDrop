import React, { Profiler, useEffect } from 'react';
import Sign_up from './components/Sign_up';
import Sign_in from './components/Sign_in';
import Home from './components/Home';
import Profile from './components/Profile';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PageNoutFound from './components/PageNoutFound';
import axios from 'axios';


function App(props) {
  const navigate = useNavigate()
  let blockPage = ["/profile"]

  useEffect(() => {
    if(blockPage.includes(location.pathname)){
      let token = localStorage.getItem("token")
      axios({
        url: "http://localhost:8080/users/" + token,
        method: "get"
      }).then((res) => {

      }).catch((err) => {
        navigate("/404")
      })
    }
  }, [location.pathname])

  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/signup' element = {<Sign_up/>} />
        <Route path='/signin' element = {<Sign_in/>} />
        <Route path='/profile' element = {<Profile/>} />
        <Route path='/*' element = {<PageNoutFound/>} />
      </Routes>
      
      
      
    </div>
  );
}

export default App;