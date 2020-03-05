import React from 'react';

export const RentalAssets = () => {

  return (
    <div className='rental-assets'>
      <h3 className='title'>Assets</h3>
      <div className='row rental-assets__detail'>
        <div className='col-xs-6'>
          <p>
            <i className='fas fa-parking'></i>
            <span>Private Parking</span>
          </p>
          <p>
            <i className='fa fa-wifi'></i>
            <span>Wifi</span>
          </p>
          <p>
            <i className="fas fa-kaaba"></i>          
            <span>Washer</span>
          </p>
          <p>
            <i className='fa fa-cube'></i>
            <span>Dryer</span>
          </p>
        </div>
        <div className='col-xs-6'>
          <p>
            <i className='fas fa-tv'></i>
            <span>Television</span>
          </p>
          <p>
            <i className="fas fa-utensils"></i>
            <span>Kitchen</span>
          </p>
          <p>
            <i className='fa fa-thermometer'></i>
            <span>Heating</span>
          </p>
          <p>
            <i className='fa fa-asterisk'></i>
            <span>A/C</span>
          </p>
        </div>
      </div>
    </div>
  )
}
