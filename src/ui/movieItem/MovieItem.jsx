import React from 'react'
import style from './item.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFav, removeFav } from '../../redux/slices/Favslice';

export default function MovieItem({data,media_type}) {
    let dispatch =useDispatch();
    let {fav} = useSelector((state)=> state.favoriteMovies);
    console.log(data);
  return (
    <>
    <div className={`col-md-2`}>
        <div className={`rounded  border border-5 position-relative ${style.item}`}>
        <Link className='nav-link' to={`/details/${data.id}/${data.media_type === undefined?media_type:data.media_type}`}>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.title} />
          </Link>
          <div className={`${style.ratings} rounded-circle`}>
            {(data.vote_average/10*100).toFixed()}<span>%</span>
        </div>
        {fav.find(elm=>elm.id === data.id )?<div onClick={()=>dispatch(removeFav(data))} className={`${style.item_icon}`}>
        remove favorites<i className={`fa-solid fa-heart ms-2`}></i>
        </div>:<div onClick={()=>dispatch(getFav(data))} className={`${style.item_icon}`}>
        add to favorites<i className={`fa-solid fa-heart ms-2`}></i>
        </div>}
        </div>
        <Link className='nav-link' to={`/details/${data.id}/${data.media_type === undefined?media_type:data.media_type}`}>
        <h6 className='mt-4'>{data.title}{data.name}</h6>
        </Link>
      </div>
    </>
  )
}
