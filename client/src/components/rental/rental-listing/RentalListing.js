import React from 'react';
import { Link } from 'react-router-dom';
import { RentalList } from './RentalList';
import RentalSearchInput from '../RentalSearchInput';
import { connect } from 'react-redux';
import { getAllRentals } from '../../../actions/rentals.action';

class RentalListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(getAllRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <div className="rentalListing-jumbotron">
          <div className="rentalListing-jumbotron__background">
            <div className='rentalListing-jumbotron__intro'>
              <h2 className="rentalListing-jumbotron__intro-title">Need a room <span className="rentalListing-jumbotron__intro-title-bold">overnight</span>? </h2>
              <h4 className="rentalListing-jumbotron__subtitle1">Join us and book your favourite place</h4>
              <Link className='button button-orange' to="/register" style={{ textDecoration: 'none' }}>
                Click here
              </Link>
            </div>
          </div>
        </div>
        <div className="rentalListing-search">
          <h6>Start searching for your city...</h6>
          <RentalSearchInput />
          <hr />
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
