import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({SaveUserData}) {
  let navigat = useNavigate()
  const [error, seterror] = useState('')
  const [validateError, setvalidateError] = useState([])
  let [user,setuser]= useState({
    "email":"",
    "password":"",
  })
  let submitForm = async (e)=>{
    e.preventDefault();
    let validateResponese = validateForm();
    if (validateResponese.error){
      setvalidateError(validateResponese.error.details)
    }
    else{
      let { data } = await axios.post(`https://route-movies-api.vercel.app/signin`,user);
    if (data.message === 'success'){
      localStorage.setItem('token',data.token);
      SaveUserData();
      homeNavigate();
    }
    else{
      seterror(data.message);
    }
    }
  }
  
  let homeNavigate = ()=>{
    navigat('/')
  }
  let getInputValue=(e)=>{
    let myUser= {...user};
    myUser[e.target.name]= e.target.value;
    setuser(myUser);
  }
  let validateForm = ()=>{
    const schema = Joi.object({
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
    })
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
    <div className='py-5 w-75 m-auto'>
    <h2>Login form</h2>
    {validateError.map((error,index)=>{
      return<div key={index} className='alert alert-danger p-2'>{error.message}</div>
    })}
    {error?<div className='alert alert-danger p-2'>{error}</div>:''}
      <form onSubmit={submitForm}>
        <div className="inbut-data">
        <label htmlFor="email">Email</label>
        <input onChange={getInputValue} type="email" className='form-control my-3' name='email' />
        </div>
        <div className="inbut-data">
        <label htmlFor="password">Password</label>
        <input onChange={getInputValue} type="password" className='form-control my-3' name='password' />
        </div>
        <button className='btn btn-info my-3'>Login</button>
      </form>
    </div>
    </>
  )
}
