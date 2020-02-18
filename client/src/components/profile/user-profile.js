import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../actions/user.action';
import UserDefaultPicture from '../../image/user-profile-icon.png';


class UserProfile extends React.Component {
    state = {
        user: '',
        avatarWindow: false
    }

    componentWillMount() {
        getUser().then(data => {
            this.setState({
                user: data
            });
        });
    }

    renderMangeButtons() {
        return (
            <div className="profile-manage-buttons">
                <Link 
                    to="/user/profile/rentals-manage"
                    className="button button-manage button-dark-gray"
                >Your Rentals</Link>
                <Link 
                    to="/user/profile/bookings-manage"
                    className="button button-manage button-dark-gray"
                >Your Bookings</Link>
            </div>
        )
    }

    renderUserAvatar() {
        const { user } = this.state;

        return (
            <div className="profile-avatar">
                <img src={
                    user.avatar === '' ? UserDefaultPicture : user.avatar
                } alt="user-avatar" />
                <button 
                    className="btn btn-link"
                    
                >Change avatar</button>
            </div>
        )
    }

    render() {
        const { user } = this.state;

        return (
            <div className="profile">
                <div className="profile-container">
                    {this.renderUserAvatar()}
                    <hr />
                    <h2>{user.firstname} {user.lastname}</h2>
                    <h6>Joined on {user.joined}</h6>
                    {/* Buttons */}
                    {this.renderMangeButtons()}
                </div>
            </div>
        )
    }
}


export default UserProfile;