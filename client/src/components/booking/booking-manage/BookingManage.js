import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookingCard, PaymentCard } from './BookingCard';

import * as actions from 'actions';
import { LightSpeed, Fade } from 'react-reveal';




class BookingManage extends React.Component {

  state = {
    pendingPayments: []
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  getPendingPayments() {
    actions.getPendingPayments()
      .then(pendingPayments => this.setState({pendingPayments}))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    actions.acceptPayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err))
  }

  declinePayment(payment) {
    actions.declinePayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err))
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
  }

  renderPayments(payments) {
    return payments.map((payment, index) => <PaymentCard booking={payment.booking}
                                                         payment={payment}
                                                         paymentBtns={this.renderPaymentButtons}
                                                         key={index} />);
  }

  renderPaymentButtons = (payment) => {
    return (
      <div>
        <button onClick={() => this.acceptPayment(payment)} className="btn btn-success">Accept</button>{' '}
        <button onClick={() => this.declinePayment(payment)} className="btn btn-danger">Decline</button>
      </div>
    )
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { pendingPayments } = this.state;

    return (
      <React.Fragment>
        <section id="userBookings" className="page-layout-two">
          <h1 className="page-title"><span style={{color: '#db5b06'}}>My</span> Bookings</h1>
          <div className="row">
            { this.renderBookings(bookings) }
          </div>
          { !isFetching && bookings.length === 0 &&
              <div className="alert alert-warning">
              You currently have no bookings. Check out our available bookings today!
              <br />
              <Link style={{'marginLeft': '10px', margin: '5px auto 0 auto'}} className="btn btn-dark" to="/rentals" >Check Rentals </Link>
            </div>
          }
        </section>
        <section id="pendingBookings" className="page-layout-two">
          <h1 className="page-title">Pending <span style={{color: '#db5b06'}}>Bookings</span></h1>
          <div className="row">
          { this.renderPayments(pendingPayments) }
          </div>
          { !isFetching && pendingPayments.length === 0 &&
            <div className="alert alert-warning">
              You are currently having no pending bookings...
            </div>
          }
        </section>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)
