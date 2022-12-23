import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Details from './component/details/Details';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Masterlayout from './component/masterlayout/Masterlayout';
import People from './component/people/People';
import Rigester from './component/register/Rigester';
import TopRated from './component/topRated/TopRated';
import TopRatedTv from './component/TopRatedTv/TopRatedTv';
import Upcoming from './component/Upcoming/Upcoming';
import PeopleDetails from './component/peopleDetails/PeopleDetails';
function App() {
  const [userData, setUserData] = useState(null)
  let SaveUserData=()=>{
   let encodedToken = localStorage.getItem('token');
   let decodedToken = jwtDecode(encodedToken);
   setUserData(decodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem('token')){
      SaveUserData()
    }
  }, [])

  let logOut = ()=>{
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='login'/>
  }
  let routes = createBrowserRouter([
    {path: '/',element:<Masterlayout logOut={logOut} userData={userData}/>,
    children:[
      {index:true,element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'register',element:<Rigester/>},
      {path:'login',element:<Login SaveUserData = {SaveUserData} />},
      {path:'people',element:<People/>},
      {path:'upcoming',element:<Upcoming/>},
      {path:'topRated',element:<TopRated/>},
      {path:'topRatedTv',element:<TopRatedTv/>},
      {path:"details/:id/:mediaType",element:<Details/>},
      {path:"peopledetails/:id/:mediaType",element:<PeopleDetails/>},
    ]}
  ])
  return (
    <>
    <div>
      <RouterProvider router = {routes}/>
    </div>
    </>
  );
}

export default App;
