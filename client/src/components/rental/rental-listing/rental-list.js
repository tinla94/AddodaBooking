import React from 'react';
import { RentalCard } from './rental-card';

export class RentalList extends React.Component {

  renderRentals() {
    return this.props.rentals.map((rental, index) => {
      return (
          <RentalCard key={index}
                      colNum='col-md-4 col-sm-6 col-xs-6'
                      rental={rental}/>
        )
    });
  }
  render() {
    return (
      <div className="page-layout-one">
        <div className="row">
          {this.renderRentals()}
        </div>
      </div>   
    )
  }
}
