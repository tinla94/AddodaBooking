import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

// Utils components
import { ToastContainer } from 'react-toastify';
import Header from 'components/header/Header';

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

// Protected route
import { ProtectedRoute } from 'components/shared/auth/ProtectedRoute';
import { LoggedinRoute } from './components/shared/auth/LoggedinRoute';

import * as actions from 'actions';

import 'App.scss';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    // check if user is authenticated
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  // logout feature
  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_md1xBTdWlFzacG2zswhnyrgb">
        <Provider store={store}>
          <BrowserRouter>
          <div className='App'>
            <ToastContainer />
            <Header logout={this.logout}/>
            <>
              <Switch>
                <Route exact path='/' render={() =>  <Redirect to='/rentals' /> }/>
                {/* Public rentals route */}
                <Route exact path='/rentals' component={RentalListing} />
                <Route exact path='/rentals/:id' component={RentalDetail} />
                <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />

                {/* User routes */}
                <ProtectedRoute exact path='/user/profile' component={UserProfile} />
                <ProtectedRoute exact path='/user/profile/rentals-manage' component={RentalManage} />
                <ProtectedRoute exact path='/user/profile/bookings-manage' component={BookingManage} />

                {/* Private Rentals routes */}
                <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
                <Route exact path='/rentals/:id/edit' component={RentalUpdate} />

                {/* Auth routes */}
                <Route exact path='/login' component={Login} />
                <LoggedinRoute exact path='/register' component={Register} />
              </Switch>
            </>
          </div>
          </BrowserRouter>
        </Provider>
      </StripeProvider>
    );
  }
}

export default App;
