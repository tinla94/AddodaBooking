import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
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
                <Nav.Link
                    as={NavLink}
                    eventKey="3"
                    activeClassName='active-link'
                    to="/auth/login"
                >
                    Sign In
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    eventKey="1"
                    activeClassName='active-link'
                    to="/auth/register"
                >
                    Register
                </Nav.Link>
            </React.Fragment>
        )
    }

    render() {
        const { isAuth } = this.props.auth;


        return (
            <Navbar
                collapseOnSelect
                expand="lg"
            >
                {/* Navbar brand */}
                <div className="navbar-brand">
                    <h2
                        className='header-brand'>
                        <span className="header-brand_Logo">OvernightBooking</span>
                    </h2>
                </div>
                {/* Navbar toggle button on mobile */}
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav" />
                {/* Navbar links */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={NavLink}
                            eventKey="1"
                            activeClassName='active-link'
                            to="/"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            eventKey="1"
                            activeClassName='active-link'
                            to="/contact-us"
                        >
                            Contact Us
                        </Nav.Link>
                        {isAuth &&
                            <Nav.Link
                                as={NavLink}
                                eventKey="5"
                                activeClassName='active-link'
                                to='/user/account'
                            >
                                Profile
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
