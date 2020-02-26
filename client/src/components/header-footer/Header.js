import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <li>
        <span
          className='nav-item nav-link clickable'
          onClick={this.handleLogout}>
          Sign Out
        </span>
      </li>
    }

    return (
      <React.Fragment>
        <li>
          <Link
            className='nav-item nav-link'
            to='/auth/login'>
            Sign In
          </Link>
        </li>
        <li>
          <Link
            className='nav-item nav-link'
            to='/auth/register'>
            Register
          </Link>
        </li>
      </React.Fragment>
    )
  }

  render() {
    const { isAuth } = this.props.auth;


    return (
      <nav>
        <div className="nav-container">
          <Link className='header-brand' to='/rentals'>
            <span className="header-brand_Logo">OvernightBooking</span>
          </Link>
          <ul className='header-links'>
            <li><Link className='nav-item nav-link' to='/'>Home</Link></li>
            <li><Link className='nav-item nav-link' to='/contact-us'>Contact Us</Link></li>
            {isAuth &&
              <li>
                <Link className='nav-item nav-link' to='/user/account'>
                  Profile
                </Link>
              </li>
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
