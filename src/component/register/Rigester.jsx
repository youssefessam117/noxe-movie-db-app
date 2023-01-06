import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Rigester() {
  const [loading, setloading] = useState(false)
  let navigat = useNavigate()
  const [error, seterror] = useState('')
  const [validateError, setvalidateError] = useState([])
  let [user,setuser]= useState({
    "first_name":"",
    "last_name":"",
    "email":"",
    "password":"",
    "age":"",
  })
  let submitForm = async (e)=>{
    setloading(true)
    e.preventDefault();
    let validateResponese = validateForm();
    if (validateResponese.error){
      setvalidateError(validateResponese.error.details)
    }
    else{
      let { data } = await axios.post(`https://route-movies-api.vercel.app/signup`,user);
    if (data.message === 'success'){
      setloading(true)
      login();
    }
    else{
      setloading(true)
      seterror(data.message);
    }
    }
  }
  
  let login = ()=>{
    navigat('/login')
  }
  let getInputValue=(e)=>{
    let myUser= {...user};
    myUser[e.target.name]= e.target.value;
    setuser(myUser);
  }
  let validateForm = ()=>{
    const schema = Joi.object({
      first_name:Joi.string().alphanum().required().min(2).max(20),
      last_name:Joi.string().alphanum().required().min(2).max(20),
      age:Joi.number().required().min(18).max(200),
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
    })
    return schema.validate(user,{abortEarly:false});
  }
  return (
    <>
    <div className='py-5 w-75 m-auto'>
    <h2>Registeration form</h2>
    {validateError.map((error,index)=>{
      return<div key={index} className='alert alert-danger p-2'>{error.message}</div>
    })}
    {error?<div className='alert alert-danger p-2'>{error}</div>:''}
      <form onSubmit={submitForm}>
        <div className="inbut-data my-2">
        <label htmlFor="first_name">First name</label>
        <input onChange={getInputValue} type="text" className='form-control my-3' name='first_name' />
        </div>
        <div className="inbut-data">
        <label htmlFor="last_name">Last name</label>
        <input onChange={getInputValue} type="text" className='form-control my-3' name='last_name' />
        </div>
        <div className="inbut-data">
        <label htmlFor="age">Age</label>
        <input onChange={getInputValue} type="number" className='form-control my-3' name='age' />
        </div>
        <div className="inbut-data">
        <label htmlFor="email">Email</label>
        <input onChange={getInputValue} type="email" className='form-control my-3' name='email' />
        </div>
        <div className="inbut-data">
        <label htmlFor="password">Password</label>
        <input onChange={getInputValue} type="password" className='form-control my-3' name='password' />
        </div>
        <button className='btn btn-info my-3'>{loading?<i className='fas fa-spinner fa-spin'></i>:'register'}</button>
      </form>
    </div>
    </>
  )
}
