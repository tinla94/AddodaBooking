import React from 'react';
import { Link } from 'react-router-dom';

export function RentalCard(props) {
  const rental = props.rental;

  return (
    <div className={props.colNum}>
      <Link 
        className='rental-detail-link' 
        to={`/rentals/${rental._id}`}>
        <div className='card bwm-card'>
          <img className='card-img-top' src={rental.image} alt={rental.title}></img>
          <div className='card-block'>
            <h3 className='card-title'>{rental.title}</h3>
            <h6 className={`card-subtitle`}>{rental.city} , {rental.country}</h6>
            <h5 className='card-text'>${rental.dailyRate} / night</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}
