import React, { useEffect, useState } from 'react';
import { fetchStream, deleteStream } from '../../actions';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {

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

  const actions = () => {
    return (
      stream && <>
        <button className="ui button negative" onClick={() => dispatch(deleteStream(stream.id))}>Delete</button>
        <button className="ui button" onClick={() => history.push('/')}>Cancel</button>
      </>
    )
  }

  return (
    <Modal
      title="Delete Stream"
      content={stream && `Are you sure you want to delete: ${stream.title}?`}
      actions={() => actions()}
      onDismiss={() => history.push('/')}
    />
  )
}

export default StreamDelete