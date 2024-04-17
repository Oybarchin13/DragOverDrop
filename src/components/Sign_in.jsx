import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Sign_in(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = () => {
    axios({
      url: 'http://localhost:8080/users',
      method:"get"
    }).then((res) => {
      res.data.map((item) => {
        if(item.username.includes(username) && item.password.includes(password)){
          localStorage.setItem("token", item.id)
          navigate("/profile")
        }
        else{
          navigate("/signup")
        }
      })
    })
  }
  
    return (
        <div className="div d-flex align-items-center justify-content-center  ">
       <div className="form-container rounded d-flex  flex-column p-5">
       <h1 className='text-center'>Sign up</h1>
      <div className="form  ">
        <div className="mt-3">
        <label>Username</label>
        <input onChange={(e) => setUsername(e.target.value)} className="form-control"  type="text" placeholder="Username" />
        </div>
        <div className="mt-3">
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="form-control" type="text" placeholder="Password" />
        </div>
        
        <button onClick={handleLogin} className="btn btn-primary  mt-3 w-100">Button</button>
        <p className="text-center mt-3">Already signed up?  <Link to = {'/signup'}>Go to sign up.</Link></p>
       
      </div>
       </div>
    </div>
    );
}

export default Sign_in;