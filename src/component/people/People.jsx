import React, { useState } from 'react';
import { useEffect } from 'react';
import { getTrending } from './../api/api';
import style from '../Upcoming/upcoming.module.scss';
import { Link } from 'react-router-dom';

export default function People() {
  const [people, setpeople] = useState([]);
  let getData = async ()=>{
    let data = await getTrending('person');
    setpeople(data);
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
    <div className="container">
    <div className="row mt-5 gx-4 gy-4">
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>Popular People</h3>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {people.map((item,index)=>
        <div key={index} className="col-md-2">
        <Link to={`/peopledetails/${item.id}/${item.media_type}`}>
        <div className="item shadow rounded  border border-5">
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt={item.title} />
        </div>
        <h6 className='mt-3'>{item.title}{item.name}</h6>
        </Link>
      </div>
      )}
    </div>
    </div>
    </>
  )
}
