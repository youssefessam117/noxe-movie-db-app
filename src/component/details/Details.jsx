import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import style from './details.module.scss';
import { getRecommendations } from '../api/api';
export default function Details() {
  const [details, setdetails] = useState({});
  const [recommendationsData, setrecommendationsData] = useState([]);
  let {id,mediaType}= useParams();
  let getDetails = async()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=3a8d4bff99757bb1b549c063f2ed3401&language=en-US`);
    setdetails(data);
  }
let Recommendations = async()=>{
  let data = await getRecommendations(mediaType,id);
  setrecommendationsData(data);
}
  useEffect(() => {
    getDetails()
    Recommendations()
  }, [])
  console.log(recommendationsData);
  return (
    <>
    <div style={{ 
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
            <span className=' fs-1 fw-bolder'>{details.original_title}{details.name}</span> <a target={`_blank`} className='fa-solid fa-link' href={details.homepage}></a>
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
            Recommendations
            </span>
          </p>
          <div className="col-md-5">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active">
          </div>
            {recommendationsData.map((recommend)=>
            <div key={recommend.id} className="carousel-item">
              <p className=' bg-danger my-0'>{recommend.title}{recommend.name}</p>
            <img src={`https://image.tmdb.org/t/p/original${recommend.poster_path}`} className="d-block w-100" alt="" />
          </div>
      )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
