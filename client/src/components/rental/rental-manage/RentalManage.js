import React from 'react';
import { deleteRental } from '../../../actions/rentals.action';
import { getUserRentals } from '../../../actions/user.action';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';
import { Roll } from 'react-reveal';

export class RentalManage extends React.Component {
  // state
  state = {
      userRentals: [],
      errors: [],
      isFetching: false
    }

  componentWillMount() {
    this.setState({ isFetching: true });

    getUserRentals().then(
      userRentals => this.setState({ userRentals, isFetching: false }),
      errors => this.setState({ errors, isFetching: false }))
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) =>
      <RentalManageCard modal={<RentalManageModal bookings={rental.bookings} />}
        key={index}
        rental={rental}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental.bind(this)} />);
  }

  deleteRental(rentalId, rentalIndex) {
    deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({ userRentals });
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id='userRentals' className="page-layout-two">
          <div className="profile-sublinks">
            <Link
              to="/user/profile"
              className="profile-sublinks-link-1"
            >
              Profile
            </Link>
            /
            <Link
              to="/user/profile/bookings-manage"
              className="profile-sublinks-link-2"
            >
              Manage bookings
            </Link>
          </div>
        <ToastContainer />
        <h1 className='page-title'>Manage Rentals</h1>
        <Link
          style={{ margin: '2rem 0' }}
          className='button button-link button-gray' to='/rentals/rental/create'>Add Rental</Link>
        <hr />
        <div className='row'>
          {this.renderRentalCards(userRentals)}
        </div>
        {!isFetching && userRentals.length === 0 &&
          <div className='alert alert-warning'>
            You don't have any rentals on your list now. Please use button 'Add Rental' above to add new rentals to your list.
          </div>
        }
      </section>
    )
  }
}
