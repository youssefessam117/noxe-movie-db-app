import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from './../api/api';
import style from './home.module.scss';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Home() {
  const [trendingMovie, settrendinMovie] = useState([])
  const [trendingTv, settrendingTv] = useState([])
  useEffect(() => {
    getData()
  }, [])
let getData =async ()=>{
  let movies = await getTrending('movie');
  settrendinMovie(movies);
  let tv = await getTrending('tv');
  settrendingTv(tv);
}
  return (
    <>

    <div className="container">
    <div className="row mt-5 gx-4 gy-4">
      <div className="col-md-12 mb-0">
        <p className=' fs-1 fw-bolder'>Welcome.</p>
        <p className=' fs-3'>Millions of movies, TV shows and people to discover. <span className='text-secondary'>Explore now.</span></p>
      </div>
      <div className="col-md-12 mt-0">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active shadow-lg">
              <div>
              <img height={'500px'} className="d-block w-100" src={`https://image.tmdb.org/t/p/original${trendingMovie[0]?.backdrop_path}`} alt="" />
              </div>
              <div className={`${style.layer}`}>
                    <p className='ms-5 mb-3 fs-2 fw-bold'>{trendingMovie[0]?.title}</p>
                    <p className='ms-5 mb-3 text-danger fs-2 fw-bold'>{trendingMovie[0]?.vote_average.toFixed(1)}/10</p>
              </div>
          </div>
            {trendingMovie.slice(1).map((recommend,index)=><>
            <div key={index} className="carousel-item position-relative shadow-lg">
              <div>
              <img height={'500px'} src={`https://image.tmdb.org/t/p/original${recommend.backdrop_path}`} className="d-block w-100" alt="" />
              </div>
              <div className={`${style.layer}`}>
                    <p className='ms-5 mb-3 fs-2 fw-bold'>{recommend.title}</p>
                    <p className='ms-5 mb-3 text-danger fs-2 fw-bold'>{recommend.vote_average.toFixed(1)}/10</p>
              </div>
          </div>
          </>
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
      <div className="col-md-4">
        <div className={`w-25 mb-3 ${style.brder}`}>
        </div>
        <h3>Trending</h3>
        <h3>Movies</h3>
        <h3>to watch now</h3>
        <span className='text-muted'> most watched movies by day</span>
        <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {trendingMovie.slice(0,10).map((item,index)=>
        <div key={index} className="col-md-2">
      <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
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
      {trendingTv.slice(0,10).map((item,index)=>
        <div key={index} className="col-md-2">
          <Link to={`/details/${item.id}/${item.media_type}`}>
        <div className="item rounded border border-5 position-relative">
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
