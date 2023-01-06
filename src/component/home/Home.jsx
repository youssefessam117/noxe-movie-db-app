import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loading from './../../ui/loading/Loading';
import MovieItem from './../../ui/movieItem/MovieItem';
import { getTrending } from './../api/api';
import style from './home.module.scss';

export default function Home() {
  const [loading, setloading] = useState(false)
  const [trendingMovie, settrendinMovie] = useState([]);
  const [trendingTv, settrendingTv] = useState([]);
  useEffect(() => {
    getData()
  }, [])
let getData =async ()=>{
  setloading(true)
  let movies = await getTrending('movie');
  settrendinMovie(movies);
  let tv = await getTrending('tv');
  settrendingTv(tv);
  setloading(false)
}
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
  return (
    <>
    {loading?<Loading loading ={loading}/>:<>{/* Carousel  area  */}
    <div className="container">
    <div className="row mt-5 gx-4 gy-4 justify-content-center">
      <div className="col-md-12 mb-0">
        <p className=' fs-1 fw-bolder'>Welcome.</p>
        <p className=' fs-3'>Millions of movies, TV shows and people to discover. <span className='text-secondary'>Explore now.</span></p>
      </div>
      <Slider {...settings}>
          {trendingMovie.map((item,index)=><div key={index} className="position-relative shadow-lg">
            <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
            <div>
              <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="w-100" alt="" /> 
              </div>
              <div className={`${style.layer}`}>
                    <p className='ms-5 mb-3 fs-2 fw-bold'>{item.title}</p>
                    {(item.vote_average/10*100).toFixed()> 50? <p className='ms-5 mb-3 fs-2 fw-bold text-success'>User Score :
                     {(item.vote_average/10*100).toFixed()}%</p> :<p className='ms-5 mb-3 fs-2 fw-bold text-danger'>User Score : {(item.vote_average/10*100).toFixed()}%</p>}
              </div>
            </Link>
          </div>)}
        </Slider>
{/* Carousel  area  */}

{/*border style  */}
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>Trending</h3>
        <h3>Movies</h3>
        <h3>to watch now</h3>
        <span className='text-muted'> most watched movies by day</span>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
{/* movies */}

      {trendingMovie.slice(0,10).map((item,index)=><MovieItem key={item.id} data={item}/>)}
    </div>
{/* movies */}
{/* tv shows */}
    <div className="row mt-5 gx-4 gy-4">
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>Trending</h3>
        <h3>TV</h3>
        <h3>to watch now</h3>
        <span className='text-muted'> most watched movies by day</span>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {trendingTv.slice(0,10).map((item)=><MovieItem key={item.id} data={item}/>)}
    </div>
    </div></>}
    </>
  )
}
