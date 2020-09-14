import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchStream } from '../../actions';

const StreamShow = () => {
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
  return (
    stream ? <div>{stream.title}</div>
      : <div>Loading...</div>
  )
}

export default StreamShow