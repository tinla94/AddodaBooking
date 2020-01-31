import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';
import { Roll } from 'react-reveal';

export class RentalManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    }

    this.deleteRental = this.deleteRental.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserRentals().then(
      userRentals => this.setState({userRentals, isFetching: false}),
      errors => this.setState({errors, isFetching: false}))
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) =>
     <RentalManageCard modal={<RentalManageModal bookings={rental.bookings}/>}
                       key={index}
                       rental={rental}
                       rentalIndex={index}
                       deleteRentalCb={this.deleteRental} />);
  }

  deleteRental(rentalId, rentalIndex) {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({userRentals});
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id='userRentals' className="page-layout-two">
        <ToastContainer />
        <h1 className='page-title'><span style={{color: '#db5b06'}}>My</span> Rentals</h1>
        <div className='row'>
        {this.renderRentalCards(userRentals)}
        </div>
        { !isFetching && userRentals.length === 0 &&
          <div className='alert alert-warning'>
            You dont have any rentals currenty created. If you want advertised your property
            please follow this link.
            <Link style={{'marginLeft': '10px'}} className='button button-link button-gray' to='/rentals/new'>Register Rental</Link>
          </div>
        }
      </section>
    )
  }
}
