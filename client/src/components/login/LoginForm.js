import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from 'components/shared/form/FormInput';
import { FormError } from 'components/shared/form/FormError';
import { required, minLength4 } from 'components/shared/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="email"
          type="email"
          label='Email'
          className='form-control'
          component={FormInput}
          validate={[required, minLength4]}
        />
        <Field
          name="password"
          type="password"
          label='Password'
          className='form-control'
          component={FormInput}
          validate={[required]}
        />
        <button className='button button-orange' type="submit" disabled={!valid || pristine || submitting}>
          Submit
        </button>
      <FormError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
