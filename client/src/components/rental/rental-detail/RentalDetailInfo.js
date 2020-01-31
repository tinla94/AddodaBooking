import React from 'react';
import { RentalAssets } from './RentalAssets';
import { toUpperCase, rentalType } from 'helpers';
import { Fade, Roll } from 'react-reveal';

export function RentalDetailInfo(props) {
  const rental = props.rental;

  return (
      <div className='rental'>
        <Fade left duration={1200} delay={1000}>
          <h2 className={`rental-type ${rental.category}`}>{rentalType(rental.shared)} {rental.category}</h2>
        </Fade>
        <div className="rental-owner">
          <Fade duration={1000} delay={1000}>
          <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
          <span>{rental.user && rental.user.username}</span>
          </Fade>
        </div>
        <Roll left duration={1000} delay={1000}>
          <h1 className='rental-title'>{rental.title}</h1>
          <h2 className='rental-city'>{toUpperCase(rental.city)}</h2>
        </Roll>
        <div className='rental-room-info'>
          <Fade duration={1200} delay={1000}>
            <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
            <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
            <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
          </Fade>
        </div>
        <Roll left duration={1000} delay={1000}>
          <p className='rental-description'>
            {rental.description}
          </p>
        </Roll>
        <hr></hr>
        <RentalAssets />
      </div>
    )
}
