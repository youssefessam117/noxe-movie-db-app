import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function Navbar({userData,logOut}) {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.bgNavbar}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="">noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className={`${styles.link_hover} nav-item dropdown`}>
          <Link className="nav-link" to=''>Home</Link>
        </li>
        <li className={`${styles.link_hover} nav-item dropdown`}>
          <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Movies</Link>
          <ul className={`dropdown-menu bg-secondary ${styles.m_menu}`}>
            <li>
              <Link to='upcoming' className={`dropdown-item ${styles.link}`}>Upcoming</Link>
            </li>
            <li>
              <Link to='topRated' className={`dropdown-item ${styles.link}`}>TopRated</Link>
            </li>
          </ul>
        </li>
        <li className={`${styles.link_hover} nav-item dropdown`}>
          <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tvshows</Link>
          <ul className={`dropdown-menu bg-secondary ${styles.m_menu}`}>
            <li>
              <Link to='topRatedTv' className={`dropdown-item ${styles.link}`}>TopRated</Link>
            </li>
          </ul>
        </li>
        <li className={`${styles.link_hover} nav-item dropdown`}>
          <Link className="nav-link" to='people'>People</Link>
        </li>
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData?
        <>
        <li className="nav-link text-white px-3" to='profile'> Hello {userData.first_name}</li>
        <li className="nav-item px-3">
          <Link className="nav-link" to='favourite'>Your <span className={`text-danger`}>Favourites</span> <i className="fa-regular fa-heart text-danger"></i> </Link>
        </li>
        <li className={`${styles.auth} nav-item px-3 badge`}>
        <Link onClick={logOut} className="nav-link"><i className="fa-solid fa-right-from-bracket"></i> Log Out</Link>
        </li>
        </>
        :<>
      <li className={`${styles.auth} nav-item px-2 bg-info badge mx-2`}>
      <Link className="nav-link" to="login">login</Link>
      </li>
       <li className={`${styles.auth} nav-item px-2 bg-info badge mx-2`}>
          <Link className="nav-link" to="register">Register</Link>
       </li>
             </>}
      </ul>
    </div>
  </div>
</nav>

  )
}
