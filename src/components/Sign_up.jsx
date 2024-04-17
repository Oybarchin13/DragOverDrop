import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Sign_up(props) {

  const { handleSubmit, register, reset } = useForm()
  const navigate = useNavigate()

  function mySubmit(data) {
           
    if (data.password == data.confirm_password) {
      delete data.confirm_password
      axios({
        url: "http://localhost:8080/users",
        method: "post",
        data: data
      }).then((res) => {
        
        navigate("/signin")
      })
    }

  }

  return (
    <div className="div d-flex align-items-center justify-content-center  ">
      <div className="form-container rounded d-flex  flex-column p-5">
        <h1 className='text-center'>Sign up</h1>
        <form className="form" onSubmit={handleSubmit(mySubmit)}>
          <div className="mt-3">
            <label>Username</label>
            <input {...register("username")} className="form-control" type="text" placeholder="Username" />
          </div>
          <div className="mt-3">
            <label>Password</label>
            <input {...register("password")} className="form-control" type="text" placeholder="Password" />
          </div>
          <div className="mt-3">
            <label>Confirm password</label>
            <input {...register("confirm_password")} className="form-control" type="text" placeholder="Confirm password" />
          </div>
          <button className="btn btn-primary  mt-3 w-100">Submit</button>
          <p className="text-center mt-3">Already signed up? <Link to = {'/signin'}>Go to sign in.</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Sign_up;
