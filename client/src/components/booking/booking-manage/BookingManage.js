import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLayout from '../../../utils/layout/Page-Layout';
import { BookingCard, PaymentCard } from './BookingCard';
import { fetchUserBookings } from '../../../actions/bookings-payments.action';
import { getPendingPayments, acceptPayment, declinePayment } from '../../../actions/bookings-payments.action';



class BookingManage extends React.Component {

  state = {
    pendingPayments: []
  }

  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
    this.getPendingPayments();
  }

  getPendingPayments() {
    getPendingPayments()
      .then(pendingPayments => this.setState({ pendingPayments }))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    acceptPayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err))
  }

  declinePayment(payment) {
    declinePayment(payment)
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
      <PageLayout>
        <div className="user-bookings">
          <div className="profile-sublinks">
            <Link
              to="/user/account"
              className="profile-sublinks-link-1"
            >
              Profile
            </Link>
            /
            <Link
              to="/user/account/rentals-manage"
              className="profile-sublinks-link-2"
            >
              Manage rentals
            </Link>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="page-title">Manage Bookings</h1>
              <hr />
              <div className="row">
                {this.renderBookings(bookings)}
              </div>
              {!isFetching && bookings.length === 0 &&
                <div className="alert alert-warning">
                  You currently have no bookings. Book your place today!
              <Link className="btn btn-link" to="/rentals" >Check Rentals </Link>
                </div>
              }
            </div>
            <div className="col-sm-6 col-xs-12">
              <h1 className="page-title">Pending Bookings</h1>
              <hr />
              <div className="row">
                {this.renderPayments(pendingPayments)}
              </div>
              {!isFetching && pendingPayments.length === 0 &&
                <div className="alert alert-warning">
                  You are currently having no pending bookings...
            </div>
              }
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)
