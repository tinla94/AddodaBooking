import React from 'react';
import { RentalList } from './rental-list';
import RentalSearchInput from '../RentalSearchInput';
import { connect } from 'react-redux';
import { getAllRentals } from '../../../actions/rentals.action';
import { Bounce } from 'react-reveal';

class RentalListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(getAllRentals());
  }

  render() {
    const {rentals } = this.props;

    return (
      <section id="rentalListing">
        <div className="rentalListing-jumbotron">
          <div className="rentalListing-jumbotron__background">
            <div className='rentalListing-jumbotron__intro'>
              <Bounce 
                bottom 
                delay={500} 
                duration={1000}
                >
                <h2
                  className="rentalListing-jumbotron__intro-title">
                  TOP RENTAL COMMUNITY
              </h2>
              </Bounce>
              <Bounce 
                top 
                delay={500} 
                duration={1000}
                >
                <h3
                  className="rentalListing-jumbotron__intro-subtitle">
                  <span>
                    Start your booking today
                </span>
                </h3>
              </Bounce>
            </div>
          </div>
        </div>
        <div className="rentalListing-search">
          <h6>Start searching for your city...</h6>
          <RentalSearchInput />
          <hr />
          <p className="rentalListing-length">Total {rentals.length} {rentals.length <= 1 ? 'place' : 'places'} available</p>
        </div>
        {/* Rental List */}
        <RentalList rentals={rentals} />
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
