import axiosService from '../services/axios-service';
import authService from '../services/auth-service';
import {
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL
} from './types';

// define axios 
const axiosInstance = axiosService.getInstance();

// Fetch user bookings
const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get('/bookings/manage')
      .then(res => res.data )
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))
  }
}


// Payments
export const getPendingPayments = () => {
    return axiosInstance.get('/payments/pending')
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
  }
  
  export const acceptPayment = (payment) => {
    return axiosInstance.post('/payments/accept', payment)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
  }
  
  export const declinePayment = (payment) => {
    return axiosInstance.post('/payments/decline', payment)
      .then(res => res.data)
      .catch(({response}) => Promise.reject(response.data.errors))
  }