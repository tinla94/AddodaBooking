import React from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';



class Header2 extends React.Component {
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
                <Nav.Link>
                    <NavLink
                        className='nav-link'
                        to='/auth/login'>
                        Sign In
                    </NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink
                        className='nav-link'
                        to='/auth/register'>
                        Register
                    </NavLink>
                </Nav.Link>
            </React.Fragment>
        )
    }

    render() {
        const { isAuth } = this.props.auth;


        return (
            <Navbar expand="lg">
                {/* Navbar brand */}
                <div className="navbar-brand">
                    <Link
                        className='header-brand'
                        to='/rentals'>
                        <span className="header-brand_Logo">OvernightBooking</span>
                    </Link>
                </div>
                {/* Navbar toggle button on mobile */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* Navbar links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <NavLink
                                activeClassName='active-link'
                                className='nav-item nav-link'
                                to='/'>Home
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink
                                activeClassName='active-link'
                                className='nav-item nav-link'
                                to='/contact-us'>
                                Contact Us
                            </NavLink>
                        </Nav.Link>
                        {isAuth &&
                            <Nav.Link>
                                <NavLink
                                    activeClassName='active-link'
                                    className='nav-item nav-link'
                                    to='/user/account'>
                                    Profile
                             </NavLink>
                            </Nav.Link>
                        }
                        {this.renderAuthButtons(isAuth)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header2));
