import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import { ToastContainer } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Header/Footer components
import Header2 from 'components/header-footer/Header2';

// Rental components
import RentalListing from 'components/rental/rental-listing/rental-listing';
import RentalSearchListing from 'components/rental/rental-listing/rental-search-listing';
import RentalDetail from 'components/rental/rental-detail/rental-detail';
import RentalUpdate from 'components/rental/rental-detail/rental-update';
import { RentalCreate } from 'components/rental/rental-create/RentalCreate';

// User Components
import UserProfile from 'components/profile/user-profile';
import { RentalManage } from 'components/rental/rental-manage/RentalManage';
import BookingManage from 'components/booking/booking-manage/BookingManage';

// Auth components
import Login from 'components/auth/signin/signin';
import { Register } from 'components/auth/signup/signup';

// Page 404 components
import Page404 from 'components/page-404';

// Protected route
import { ProtectedRoute } from './utils/routes/ProtectedRoute';
import { LoggedinRoute } from './utils/routes/LoggedinRoute';

// actions
import { checkAuthState, logout } from './actions/auth.action';

// css
import 'App.scss';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    // check if user is authenticated
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(checkAuthState());
  }

  // logout feature
  logout() {
    store.dispatch(logout());
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_md1xBTdWlFzacG2zswhnyrgb">
        <Provider store={store}>
          <BrowserRouter>
            <div className='App'>
              <ToastContainer />
              <Header2 logout={this.logout} />
              {/* CSS transition page */}
              <Route render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="fade"
                  >
                    <Switch location={location}>
                      {/* Home route */}
                      <Route exact path='/' render={() => <Redirect to='/rentals' />} />
                      {/* Public rentals route */}
                      <Route exact path='/rentals' component={RentalListing} />
                      <Route exact path='/rentals/:id' component={RentalDetail} />
                      <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />

                      {/* User routes */}
                      <ProtectedRoute exact path='/user/account' component={UserProfile} />
                      <ProtectedRoute exact path='/user/account/rentals-manage' component={RentalManage} />
                      <ProtectedRoute exact path='/user/account/bookings-manage' component={BookingManage} />

                      {/* Private Rentals routes */}
                      {/* <ProtectedRoute exact path='/rentals/new' component={RentalCreate2} /> */}
                      <ProtectedRoute exact path="/rentals/rental/create" component={RentalCreate} />
                      <Route exact path='/rentals/rental/:id/edit' component={RentalUpdate} />

                      {/* Auth routes */}
                      <Route exact path='/auth/login' component={Login} />
                      <LoggedinRoute exact path='/auth/register' component={Register} />

                      {/* Error handling route */}
                      <Route component={Page404} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )} />
            </div>
          </BrowserRouter>
        </Provider>
      </StripeProvider>
    );
  }
}

export default App;
