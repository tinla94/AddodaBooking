import React from 'react';
import { RentalAssets } from './rental-asset';
import { rentalType } from 'helpers';


export function RentalDetailInfo(props) {
  const rental = props.rental;

  return (
    <div className='rental'>
      <h1 className='rental-title'>{rental.title}</h1>
      <h2 className='rental-country'>
        <span style={{ color: 'black', fontWeight: 'bold' }}>{rentalType(rental.shared)} {rental.category}
        </span> - {rental.city}, {rental.country}
      </h2>
      <hr />
      <div className="rental-user">
          <img src={rental.user.avatar} alt="user avatar"/>
          <p>{rental.user.firstname} {rental.user.lastname}</p>
      </div>
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
