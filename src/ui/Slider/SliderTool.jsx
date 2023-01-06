import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import style from './sliderTool.module.scss';

export default function SliderTool({recommendationsData,settings}) {
  return (
    <>
    <Slider {...settings}>
          {recommendationsData.map((item,index)=><div key={index} className="position-relative shadow-lg">
          
              <div>
              <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="d-block w-100" alt="" /> 
              </div>
              <div className={`${style.rec_layer}`}>
              <Link className='nav-link' to={`/details/${item.id}/${item.media_type}`}>
                    <p className='ms-5 mb-3 fs-2 fw-bold'>{item.title}</p>
                    </Link>
                    {(item.vote_average/10*100).toFixed()> 50? <p className='ms-5 mb-3 fs-2 fw-bold text-success'>User Score :
                     {(item.vote_average/10*100).toFixed()}%</p> :<p className='ms-5 mb-3 fs-2 fw-bold text-danger'>User Score : {(item.vote_average/10*100).toFixed()}%</p>}
              </div>
              
          </div>)}
        </Slider>
    </>
  )
}
