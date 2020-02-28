import React from 'react';
import { toUpperCase, pretifyDate, pretifyTime } from '../../../helpers';
import { Link } from 'react-router-dom';




export class RentalManageCard extends React.Component {
  constructor() {
    super();

    this.state = {
      wantDelete: false
    }
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    })
  }

  deleteRental(rentalId, rentalIndex) {
    this.setState({ wantDelete: false });

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }


  render() {
    const { rental, modal, rentalIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
          <div className='card-block'>
            <h2 className='card-title'>{rental.title}</h2>
            <p style={{ color: 'gray' }}>---{toUpperCase(rental.city)}---</p>
            <hr />
            <Link
              className='btn btn-link'
              to={`/rentals/${rental._id}`}>Go to Rental</Link>
            {rental.bookings && rental.bookings.length > 0 && modal}
          </div>
          <div className='card-footer text-muted'>
            Created on {pretifyDate(rental.createdAt)}
            <br />
            At {pretifyTime(rental.createdAt)}
            <br />
            {!wantDelete &&
              <React.Fragment>
                <Link
                  className='btn btn-link'
                  to={{ pathname: `/rentals/${rental._id}/edit`, state: { isUpdate: true } }}
                  style={{ color: 'orange' }}
                > Edit </Link>
                <button
                  onClick={() => { this.showDeleteMenu() }}
                  className='btn btn-link'
                  style={{ color: 'red', textDecoration: 'none' }}
                > Delete </button>
              </React.Fragment>
            }
            {wantDelete &&
              <div className='delete-menu'>
                Do you confirm?
                <br />
                <div style={{ marginTop: '5px' }}>
                  <button
                    onClick={() => { this.deleteRental(rental._id, rentalIndex) }} className='btn btn-success'> Yes </button>
                  <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-danger'> No </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
