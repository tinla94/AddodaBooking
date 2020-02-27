import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getUser } from '../../actions/user.action';
import CenterLayout from '../../utils/layout/Center-Layout';
import UserDefaultPicture from '../../images/user-profile-icon.png';
import { ProfileAvatarUpload } from './user-profile-image';


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
                    to="/user/account/rentals-manage"
                    className="button button-manage button-dark-gray"
                >Your Rentals</Link>
                <Link
                    to="/user/account/bookings-manage"
                    className="button button-manage button-dark-gray"
                >Your Bookings</Link>
            </div>
        )
    }

    renderUserAvatar() {
        const { user } = this.state;

        return (
            <div className="profile-avatar">
                <div className="profile-avatar-container">
                    <img
                        src={user.avatar === '' ? UserDefaultPicture : user.avatar}
                        alt="user-avatar"
                    />
                </div>
                <ProfileAvatarUpload />
            </div>
        )
    }

    render() {
        const { user } = this.state;
        console.log(user);

        return (
            <CenterLayout>
                <div className="profile">
                    <div className="profile-container">
                        {this.renderUserAvatar()}
                        <hr />
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p>From {user.country ? user.country : 'United State'}</p>
                        <h5>Joined on {moment(user.joined).format('MMMM Do YYYY')}</h5>

                        {/* Buttons */}
                        {this.renderMangeButtons()}
                    </div>
                </div>
            </CenterLayout>
        )
    }
}


export default UserProfile;