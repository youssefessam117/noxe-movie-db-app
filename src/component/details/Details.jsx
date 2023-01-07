import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SliderTool from '../../ui/Slider/SliderTool';
import { getRecommendations } from '../api/api';
import style from './details.module.scss';
import Loading from './../../ui/loading/Loading';

export default function Details() {
  const [loading, setloading] = useState(false)
  const [details, setdetails] = useState({});
  const [recommendationsData, setrecommendationsData] = useState([]);
  let {id,mediaType}= useParams();
  let getDetails = async()=>{
    setloading(true);
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=3a8d4bff99757bb1b549c063f2ed3401&language=en-US`);
    setdetails(data);
    setloading(false);
  }
let Recommendations = async()=>{
  let data = await getRecommendations(mediaType,id);
  setrecommendationsData(data);
}
  useEffect(() => {
    getDetails()
    Recommendations()
  }, [mediaType,id])
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
    {loading?<Loading loading={loading}/>:<><div style={{ 
      backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      // backgroundPosition:'left calc((50vw - 170px) - 340px) top' 
    }} className="mt-5">
      <div className={`${style.layer} py-5`}>
        <div className="container">
          <div className="row">
          <div className="col-md-3">
            <div className="card" style={{width: '18rem'}}>
              <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} className="card-img-top" alt={details.title} />
            </div>
            </div>
          <div className="col-md-9 mt-5">
            <span className=' fs-1 fw-bolder'>{details.original_title}{details.name}</span> <a target={`_blank`} href={details.homepage}><i className='fa-solid fa-link'></i></a>
            <p className=' text-muted'>{details.tagline}</p>
            <p>release data : {details.release_date}{details.first_air_date}</p>
            <p>{details.genres?.map((value)=>{
                return<span key={value.id} className='badge bg-dark mx-2'> {value.name}</span>
              })}</p>
              <p>run time : {`${details.runtime}m`}</p>
              <p>{`User Score : ${details.vote_average}`} /10</p>
              <p className=' my-1 text-warning'>overview</p>
              <p className=''>{details.overview}</p>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <p>
            <span className=' badge bg-info fs-3'>
            Related {mediaType}
            </span>
          </p>
          
          <div className="col-md-9">
            <SliderTool recommendationsData ={recommendationsData} settings ={settings}/>
          </div>
        </div>
      </div></>}
    </>
  )
}
