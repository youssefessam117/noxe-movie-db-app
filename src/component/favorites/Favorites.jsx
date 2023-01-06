import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from './../../ui/movieItem/MovieItem';
import style from './favorites.module.scss';
let media_type = 'movie';
export default function Favorites() {
    let {fav} = useSelector((state)=> state.favoriteMovies)
  return (
    <>
    <div className="container">
            <div className="row">
            <div className="col-md-4">
            <div className={`w-25 mb-3 ${style.brder}`}>
            </div>
            <h3>My Favorites</h3>
            <div className={`w-100 mt-3 ${style.brder}`}></div>
      </div>
      {fav.map((item)=><MovieItem key={item.id} data={item} media_type ={media_type}/>)}
        </div>
    </div>
    </>
  )
}
