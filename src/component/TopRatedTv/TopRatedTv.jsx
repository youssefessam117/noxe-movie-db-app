import React, { useState } from 'react';
import { useEffect } from 'react';
import { movieTvApi } from './../api/api';
import style from '../Upcoming/upcoming.module.scss';
import { Link } from 'react-router-dom';

export default function TopRatedTv() {
  const [topRatedTv, settopRatedTV] = useState([]);
  let getData = async ()=>{
    let data = await movieTvApi('tv','top_rated');
    settopRatedTV(data);
  }
  useEffect(() => {
    getData()
  }, [])
  let media_type = 'tv';
  return (
    <>
    <div className="container">
    <div className="row mt-5 gx-4 gy-4">
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>TopRated TV</h3>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {topRatedTv.map((item,index)=>
        <div key={index} className="col-md-2">
          <Link to={`/details/${item.id}/${media_type}`}>
        <div className="item rounded  border border-5 position-relative">
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title} /> 
          <div className={`${style.ratings} rounded-circle`}>
            {item.vote_average.toFixed(1)}<span>/10</span>
        </div>
        </div>
        <h6 className='mt-4'>{item.title}{item.name}</h6>
        </Link>
      </div>
      )}
    </div>
    </div>
    </>
  )
}
