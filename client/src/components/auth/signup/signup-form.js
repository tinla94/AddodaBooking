import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../utils/form/FormInput';
import { FormError } from '../../../utils/form/FormError';


const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
    <Field
        name="firstname"
        type="text"
        label='Firstname'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="lastname"
        type="text"
        label='Lastname'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="username"
        type="text"
        label='Username'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="email"
        type="email"
        label='Email'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label='Password Confirmation'
        className='bwm-form__input'
        component={FormInput}
      />
      <button className='button button-orange' type="submit" disabled={!valid || pristine || submitting}>
        Submit
      </button>
      <FormError errors={errors} />
    </form>
  )
}

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 characters!';
  }

  if (!values.email) {
    errors.email = 'Please enter email!';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password confirmation!';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords must be the same';
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
