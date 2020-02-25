import axiosService from '../services/axios-service';


// define axios 
const axiosInstance = axiosService.getInstance();


// Get User Info
export const getUser = () => {
    return axiosInstance.get('/users/profile').then(
        res => res.data ,
        err => Promise.reject(err.response.data.errors)
    );
}

// Edit user info
export const updateUser = (userData) => {
    return axiosInstance.patch('/profile/edit', userData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}


// Delete user
export const deleteUser = () => {
    return axiosInstance.delete('/profile/delete').then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}


// Get user rentals
export const getUserRentals = () => {
    return axiosInstance.get('/users/rentals-manage').then(
        res => res.data, 
        err => Promise.reject(err.response.data.errors)
    )
}


// Upload user avatar
export const uploadUserAvatar = image => {
    const formData = new FormData();
    formData.append('avatarUpload', image);

    return axiosInstance.post('/users/profile/avatar-upload', formData)
    .then(json => {
      return json.data;
    })
    .catch(({response}) => Promise.reject(response.data.errors[0]))
}
