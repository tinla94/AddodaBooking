import React from 'react';
import { RentalAssets } from './rental-asset';
import { toUpperCase, rentalType } from 'helpers';


export function RentalDetailInfo(props) {
  const rental = props.rental;

  return (
      <div className='rental'>
          <h1 className='rental-title'>{rental.title}</h1>
          <h2 className='rental-country'>{rental.city}, {rental.country}</h2>
          <hr />
          <h2 className={`rental-type ${rental.category}`}>{rentalType(rental.shared)} {rental.category} - <span className="rental-type__host">hosted by {rental.user.firstname}</span></h2> 
        <div className='rental-room-info'>
            <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
            <span><i className='fa fa-user'></i> {rental.bedrooms} guests</span>
            <span><i className='fa fa-bed'></i> {rental.bedrooms} beds</span>
        </div>
          <p className='rental-description'>
            {rental.description}.
          </p>
        <hr></hr>
        <RentalAssets />
      </div>
    )
}
