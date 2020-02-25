import React from 'react';
import RegisterForm from './signup-form';
import { Redirect } from 'react-router-dom';
import { register } from '../../../actions/auth.action';

export class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(userData) {
    // register user
    register(userData).then(
      registered => this.setState({redirect: true}),
      errors => this.setState({errors})
    );
  }

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return <Redirect to={{pathname: '/auth/login', state: { successRegister: true }}} />
    }

    return (
      <section id='register' className="page-layout-auth">
        <div className='bwm-form'>
          <div className='row'>
            <div className='col-md-5'>
                <h1 className="bwm-form-title">Sign Up</h1>
              <RegisterForm submitCb={this.registerUser} errors={errors} />
            </div>
            <div className='col-md-6 ml-auto'>
              <div className='image-container'>
                <h2 className='catchphrase'>As our member you have access to most awesome places around the world.</h2>
                <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
