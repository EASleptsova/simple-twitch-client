import React, { useEffect } from 'react';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const StreamList = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStreams())
  }, [dispatch])

  const streams = Object.values(useSelector(state => state.streamReducer))
  const currentUserId = useSelector(state => state.authReducer.userId);
  const { isSignedIn } = useSelector(state => state.authReducer);

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link className="ui button primary" to="/streams/new"> Create Stream </Link>
        </div>
      )
    }
  }

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserId)
      return (
        <div className="right floated content">
          <Link to={`streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      )
  }
  const renderList = () => {
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div >
      )
    })
  }

  return (
    <>
      <h2>Streams</h2>
      <div className="ui celled list">
        {renderList()}
      </div>
      {renderCreate()}
    </>
  )
}

export default StreamList