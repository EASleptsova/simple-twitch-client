import React, { useEffect, useState } from 'react';
import { fetchStream, editStream } from '../../actions';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import StreamForm from './StreamForm';

const StreamEdit = () => {

  const streams = useSelector(state => state.streamReducer)
  const [stream, setStream] = useState(undefined)
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id)
      dispatch(fetchStream(id))
  }, [dispatch, id])

  useEffect(() => {
    if (id)
      setStream(streams[id])
  }, [streams, id])

  const onSubmit = (values) => {
    //console.log(values)
    if (id)
      dispatch(editStream(id, values))
  }

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={stream && { title: stream.title, description: stream.description }} />
    </div>
  )
}

export default StreamEdit