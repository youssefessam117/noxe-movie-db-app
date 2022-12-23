import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../navbar/Navbar';

export default function Masterlayout({userData ,logOut}) {
  return (
    <>
    <Navbar logOut={logOut} userData ={userData}/>
    {/* <div className="container"> */}
    <Outlet/>
    {/* </div> */}
    </>
  )
}
