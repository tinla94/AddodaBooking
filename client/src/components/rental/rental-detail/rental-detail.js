import React from 'react';
import { connect } from 'react-redux';
import { RentalDetailInfo } from './rental-detail-info';
import RentalMap from './rental-map';
import Booking from 'components/booking/Booking';
import DisqusThread from '../../../services/disqus-thread';
import { getRentalById } from '../../../actions/rentals.action';
import { Fade } from 'react-reveal';

class RentalDetail extends React.Component {

  componentWillMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id;

    this.props.dispatch(getRentalById(rentalId));
  }
  render() {
    const { rental } = this.props;

    if (rental._id) {
      return (
        <section id='rentalDetails' className="page-layout-two">
          <div className='upper-section'>
            <div className='row'>
              <div className='col-md-8'>
                <Fade top duration={1100} delay={200}>
                  <img src={rental.image} alt=''></img>
                </Fade>
              </div>
              <div className='col-md-4'>
                <Fade right duration={1100} delay={200}>
                  <RentalMap location={`${rental.city}, ${rental.address}`} />
                </Fade>
              </div>
            </div>
          </div>

          <div className='details-section'>
            <div className='row'>
              <div className='col-md-8'>
                <RentalDetailInfo rental={rental} />
              </div>
              <div className='col-md-4'>
              <Fade bottom duration={1100} delay={200}>
                <Booking rental={rental} />
              </Fade>
              </div>
            </div>
          </div>
          <hr />
          <DisqusThread />
        </section>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalDetail)
