import axios from 'axios';
import {
    RELOAD_MAP,
    RELOAD_MAP_FINISH,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTALS_FAIL,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTAL_BY_ID_SUCCESS,
    UPDATE_RENTAL_SUCCESS,
    UPDATE_RENTAL_FAIL
} from './types';

// Reloading map for rental
export const reloadMap = () => {
    return {
        type: RELOAD_MAP
    }
}

// Finish reloading map for rental
export const reloadMapFinish = () => {
    return {
        type: RELOAD_MAP_FINISH
    }
}

// Verify rental's owner
export const verifyRentalOwner = rentalId => {
    return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
}


// Get all rentals
export const getAllRentals = (city) => {
    const url = city ? `/rentals/all?city=${city}` : '/rentals/all';

    return async dispatch => {
        dispatch({
            type: FETCH_RENTALS_INIT
        })
        return await axiosInstance.get(url)
            .then(res => res.data)
            .then(rentals => {
                dispatch({
                    type: FETCH_RENTALS_SUCCESS,
                    rentals
                });
            })
            .catch(({ response }) => {
                dispatch({
                    type: FETCH_RENTALS_FAIL,
                    errors: response.data.errors
                });
            });
    };
};


// Get rental info
export const getRentalById = (rentalId) => {
    return async dispatch => {
        dispatch({
            type: FETCH_RENTAL_BY_ID_INIT
        });
        return await axios.get(`/api/rentals/${rentalId}`)
            .then(res => res.data)
            .then(rental => {
                dispatch({
                    type: FETCH_RENTAL_BY_ID_SUCCESS,
                    rental
                });
            });
    };
};

// Create rental
export const createRental = (rentalData) => {
    return axiosInstance.post('/rentals/create', rentalData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

// Update rental
export const updateRental = (rentalId, rentalData) => {
    return axiosInstance.patch(`/rentals/edit/${rentalId}`, rentalData)
    .then(res => res.data)
    .then(updatedRental => {
        dispatch({
            type: UPDATE_RENTAL_SUCCESS,
            rental: updatedRental
        });

        if (rentalData.city || rentalData.street) {
            dispatch(reloadMap());
        }
    })
    .catch(({response}) => dispatch({
        type: UPDATE_RENTAL_FAIL,
        errors: response.data.errors
    }))
};

// Delete rental
export const deleteRental = (rentalId) => {
    return axiosInstance.delete(`/rentals/delete/${rentalId}`).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}