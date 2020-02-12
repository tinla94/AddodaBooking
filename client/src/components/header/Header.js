import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import $ from 'jquery';
import RentalSearchInput from 'components/rental/RentalSearchInput';

class Header extends React.Component {

  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <span className='nav-item nav-link clickable' onClick={this.handleLogout}>Sign Out</span>
    }

    return (
      <React.Fragment>
        <li><Link className='nav-item nav-link' to='/login'>Sign In<span className='sr-only'>(current)</span></Link></li>
        <li><Link className='nav-item nav-link' to='/register'>Register</Link></li>
      </React.Fragment>
    )
  }

  // Owner section 
  // renderOwnerSection(isAuth) {
  //   if (isAuth) {
  //     return (
  //       // <div className="nav-item dropdown">
  //       //   <div className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //       //     Owner Section
  //       //   </div>
  //       //   <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
  //           // <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
  //           // <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
  //           // <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
  //       //   </div>
  //       // </div>
  //       <Dropdown>
  //         <Dropdown.Toggle variant="link" className="nav-link nav-item dropdown" id="dropdown-basic">
  //           Owner Section
  //         </Dropdown.Toggle>

  //         <Dropdown.Menu>
  //         <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
  //           <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
  //           <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     )
  //   }
  // }

  render() {
    const { username, isAuth } = this.props.auth;


    return (
      <nav>
        <div className="nav-container">
          <Link className='header-brand' to='/rentals'>
            <span className="header-brand_Logo">OvernightBooking</span>
          </Link>
          <ul className='header-links'>
            <li><Link className='nav-item nav-link' to='/'>Home</Link></li>
            <li><Link className='nav-item nav-link' to='/'>Contact Us</Link></li>
            {isAuth &&
              <li>Hello, <span style={{ color: '#db5b06' }}>{username}</span></li>
            }
            {this.renderAuthButtons(isAuth)}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));
