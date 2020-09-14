import React from 'react';
import { createStream } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import StreamForm from './StreamForm';

const StreamCreate = () => {

  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.authReducer);

  const onSubmit = (values) => {
    values.userId = userId
    dispatch(createStream(values));
  }

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  )
}

export default StreamCreate