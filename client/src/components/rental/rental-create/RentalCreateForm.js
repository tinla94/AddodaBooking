import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../utils/form/FormInput';
import { FormSelect } from '../../../utils/form/FormSelect';
import { FormTextArea } from '../../../utils/form/FormTextArea';
import { FormFileUpload } from '../../../utils/form/FormFileUpload';
import { FormError } from '../../../utils/form/FormError';


const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        label='Title'
        className='bwm-form__input'
        component={FormInput}
      />
       <Field
        name="description"
        type="text"
        label='Description'
        rows='6'
        className='form-control'
        component={FormTextArea}
      />
      <Field
        name="address"
        type="text"
        label='Address'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="city"
        type="text"
        label='City'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        name="country"
        type="text"
        label='Country'
        className='bwm-form__input'
        component={FormInput}
      />
      <Field
        options={options}
        name="category"
        label='Category'
        className='form-control'
        component={FormSelect}
      />
      <Field
        name="image"
        label='Image'
        component={FormFileUpload}
      />
      <Field
        name="bedrooms"
        type="number"
        label='Bedrooms'
        className='form-control'
        component={FormInput}
      />
      <Field
        name="dailyRate"
        type="text"
        label='Daily Rate'
        className='form-control'
        symbol='$'
        component={FormInput}
      />
      <Field
        name="shared"
        type="checkbox"
        label='Shared'
        className='form-control'
        component={FormInput}
      />
        <button className='button button-orange' type="submit" disabled={!valid || pristine || submitting}>
        Create Rental
        </button>
      <FormError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment'}
})(RentalCreateForm)
