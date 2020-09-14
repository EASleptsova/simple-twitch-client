import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';

const renderInput = field =>
  <div className="field">
    <label>{field.label}</label>
    <input {...field.input} type={field.type} />
    {field.meta.touched &&
      field.meta.error &&
      <div className="ui error message">{field.meta.error}</div>}
  </div>

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  return errors;
}

const StreamForm = (props) => {
  const { handleSubmit, onSubmit } = props
  const { userId } = useSelector(state => state.authReducer);

  const onSubmit_ = (values) => {
    values.userId = userId
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit_)} className="ui form error">
      <Field
        name="title"
        label="Enter title"
        component={renderInput}
        type="text" />
      <Field
        name="description"
        label="Enter description"
        component={renderInput}
        type="text" />
      <button className="ui button primary" type="submit">Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'StreamForm',
  validate
})(StreamForm)