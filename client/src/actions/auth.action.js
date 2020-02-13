import axios from 'axios';
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE
} from './types';
import authService from '../services/auth-service';


// Register user
export const register = (userData) => {
    return axios.post('/auth/signup', userData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}


// Log in user
export const login = (userData) => {
    return async dispatch => {
        return await axios.post('/auth/signin', userData)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(({ response }) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    errors: response.data.errors
                });
            })
    }
}


// Logout user
export const logout = () => {
    authService.invalidateUser();
    return {
        type: LOGOUT
    }
}


// Check user authentication
export const checkAuthState = () => {
    return dispatch => {
        if(authService.isAuthenticated()) {
            dispatch({
                type: LOGIN_SUCCESS
            })
        }
    }
}

