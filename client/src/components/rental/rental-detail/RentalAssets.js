import React from 'react';
import { Flip, Fade } from 'react-reveal';

export function RentalAssets() {

  return (
      <div className='rental-assets'>
        <Flip top cascade duration={600} delay={1000}>
          <h3 className='title'>Assets</h3>
        </Flip>
        <div className='row'>
          <div className='col-md-6'>
          <Fade left duration={1000} delay={1000}>
            <span><i className='fa fa-asterisk'></i> Cooling</span>
            <span><i className='fa fa-thermometer'></i> Heating</span>
            <span><i className='fa fa-location-arrow'></i> Iron</span>
          </Fade>
          </div>
          <div className='col-md-6'>
          <Fade left duration={1000} delay={1000}>
            <span><i className='fa fa-desktop'></i> Working area</span>
            <span><i className='fa fa-cube'></i> Washing machine</span>
            <span><i className='fa fa-cube'></i> Dishwasher</span>
          </Fade>
          </div>
        </div>
      </div>
    )
}
