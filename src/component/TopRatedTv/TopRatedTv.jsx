import React, { useEffect, useState } from 'react';
import style from '../Upcoming/upcoming.module.scss';
import MovieItem from './../../ui/movieItem/MovieItem';
import { movieTvApi } from './../api/api';
import Loading from './../../ui/loading/Loading';

export default function TopRatedTv() {
  const [loading, setloading] = useState(false)
  const [topRatedTv, settopRatedTV] = useState([]);
  let getData = async ()=>{
    setloading(true)
    let data = await movieTvApi('tv','top_rated');
    settopRatedTV(data);
    setloading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  let media_type = 'tv';
  return (
    <>
    {loading?<Loading/>:<div className="container">
    <div className="row mt-5 gx-4 gy-4">
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>TopRated TV</h3>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {topRatedTv.map((item,index)=><MovieItem key={item.id} data={item} media_type ={media_type}/>)}
    </div>
    </div>}
    </>
  )
}
