import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';

import * as actions from 'actions';


class RentalListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <div className="page-jumbotron">
          <div className="page-jumbotron__background">
            <h1 className="page-jumbotron__title">Welcome to <span className="page-brand">AdoddaBooking</span></h1>
            <h4 className="page-jumbotron__subtitle1">Your <span>Home</span> All Around the <span>World</span></h4>

            <p className="page-jumbotron__subtitle2">BOOK YOUR PLACE TODAY</p>
            </div>
        </div>
        {/* Rental List */}
        <RentalList rentals={this.props.rentals} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals.data
  }
}

export default connect(mapStateToProps)(RentalListing)
