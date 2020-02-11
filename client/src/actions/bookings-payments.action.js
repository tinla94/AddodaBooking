import axiosService from '../services/axios-service';
import authService from '../services/auth-service';
import {

} from './types';


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