import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import { ToastContainer } from 'react-toastify';
import Header from 'components/header/Header';
import RentalListing from 'components/rental/rental-listing/rental-listing';
import RentalSearchListing from 'components/rental/rental-listing/rental-search-listing';
import RentalDetail from 'components/rental/rental-detail/rental-detail';
import RentalUpdate from 'components/rental/rental-detail/rental-update';
import { RentalCreate } from 'components/rental/rental-create/RentalCreate';
import Login from 'components/auth/signin/signin';
import { Register } from 'components/auth/signup/signup';

import { RentalManage } from 'components/rental/rental-manage/RentalManage';
import BookingManage from 'components/booking/booking-manage/BookingManage';

import { ProtectedRoute } from 'components/shared/auth/ProtectedRoute';
import { LoggedinRoute } from './components/shared/auth/LoggedinRoute';

import * as actions from 'actions';

import 'App.scss';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

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
                <Route exact path='/rentals' component={RentalListing} />
                <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
                <ProtectedRoute exact path='/rentals/manage' component={RentalManage} />
                <ProtectedRoute exact path='/bookings/manage' component={BookingManage} />
                <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
                <Route exact path='/rentals/:id' component={RentalDetail} />
                <Route exact path='/rentals/:id/edit' component={RentalUpdate} />
                <Route exact path='/login' component={Login} />
                {/* <LoggedInRoute exact path='/register' component={Register} /> */}
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
