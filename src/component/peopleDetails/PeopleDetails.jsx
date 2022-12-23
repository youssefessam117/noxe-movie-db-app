import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import  axios  from 'axios';

export default function PeopleDetails() {

    let {mediaType,id} = useParams();
    const [details, setdetails] = useState([]);
    let getDetails = async()=>{
        let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=3a8d4bff99757bb1b549c063f2ed3401&language=en-US`);
        setdetails(data);
      }
    useEffect(() => {
        getDetails();
    }, [])
    
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="card" style={{width: '18rem'}}>
                <img className='w-100' src={`https://image.tmdb.org/t/p/original${details.profile_path}`} alt="" />
                </div>
            </div>
            <div className="col-md-9 mt-3">
                <h3 className=' fw-bolder fs-1'>{details.name}</h3>
                <p className=' fw-bolder my-1 fs-5'>Biography</p>
                <p className=' fw-lighter fs-6'>{details.biography}</p>
                <p className=' fw-bolder my-1 fs-5'>Personal Info</p>
                <p>birthday : {details.birthday}</p>
                <p>known for : {details.known_for_department}</p>
                <p>place of birth :  {details.place_of_birth}</p>
                <p>popularity : {details.popularity}</p>
            </div>
        </div>
    </div>
    </>
  )
}
