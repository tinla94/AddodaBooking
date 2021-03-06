import React from 'react';
import PageLayout from '../../../utils/layout/Page-Layout';
import RentalCreateForm from './RentalCreateForm';
import { Redirect } from 'react-router-dom';
import { createRental } from '../../../actions/rentals.action';

export class RentalCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }

    this.rentalCateogies = ['apartment', 'house', 'condo', 'room'];

    this.createRental = this.createRental.bind(this);
  }

  createRental(rentalData) {
    createRental(rentalData).then(
      (rental) => this.setState({ redirect: true }),
      (errors) => this.setState({ errors }))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname:'/rentals' }}/>
    }

    return (
      <PageLayout>
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
              <h1 
                className='page-title'
                style={{ marginBottom: '20px' }}
              >Add rental</h1>
              <RentalCreateForm submitCb={this.createRental}
                                options={this.rentalCateogies}
                                errors={this.state.errors}/>
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }
}
