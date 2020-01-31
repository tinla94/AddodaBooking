import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import RentalSearchInput from 'components/rental/RentalSearchInput';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

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
          <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
          <Link className='nav-item nav-link' to='/register'>Register</Link>
        </React.Fragment>
      )
  }

  // Owner section 
  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        // <div className="nav-item dropdown">
        //   <div className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //     Owner Section
        //   </div>
        //   <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            // <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
            // <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
            // <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
        //   </div>
        // </div>
        <Dropdown>
          <Dropdown.Toggle variant="link" className="nav-link nav-item dropdown" id="dropdown-basic">
            Owner Section
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
            <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
            <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
          </Dropdown.Menu>
        </Dropdown>
      )
    }
  }

  render() {
    const {username, isAuth} = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/rentals'>AddodaBooking
          </Link>
          <RentalSearchInput />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              { isAuth &&
                <span className='nav-item nav-link'>Hello, <span style={{color: '#db5b06'}}>{username}</span></span>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
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
