import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../utils/form/FormInput';
import { FormError } from '../../../utils/form/FormError';
import { required, minLength4 } from '../../../utils/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label='Email'
        className='bwm-form__input'
        component={FormInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        type="password"
        label='Password'
        className='bwm-form__input'
        component={FormInput}
        validate={[required]}
      />
      <button className='button button-orange' type="submit" disabled={!valid || pristine || submitting}>
        Submit
        </button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
