import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchStream } from '../../actions';
import flv from 'flv.js';

const StreamShow = () => {
  const streams = useSelector(state => state.streamReducer)
  const [stream, setStream] = useState(undefined)
  let { id } = useParams();
  const dispatch = useDispatch();
  const videoRef = useRef();

  useEffect(() => {
    if (id)
      dispatch(fetchStream(id))
  }, [dispatch, id])

  useEffect(() => {
    if (id)
      setStream(streams[id])
  }, [streams, id])

  useEffect(() => {
    if (id && stream) {
      const player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
      })
      player.attachMediaElement(videoRef.current);
      player.load();
    }
  }, [id, stream])

  return (
    stream ? <div>
      <video ref={videoRef} style={{ width: '100%' }} controls={true} />
      <h1>{stream.title}</h1>
      <div>{stream.description}</div>
    </div>
      : <div>Loading...</div>
  )
}

export default StreamShow