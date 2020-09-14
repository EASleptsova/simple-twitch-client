import streams from '../apis/streams';
import history from '../history';

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_STREAM = "CREATE_STREAM";
export const FETCH_STREAM = "FETCH_STREAM";
export const FETCH_STREAMS = "FETCH_STREAMS";
export const DELETE_STREAM = "DELETE_STREAM";
export const EDIT_STREAM = "EDIT_STREAM";

export const signIn = (userId) => {
  return {
    type: SIGN_IN, userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = (formValues) => {
  return async (disptach) => {
    const response = await streams.post('/streams', formValues);
    disptach({ type: CREATE_STREAM, payload: response.data })
    history.push('/');
  }
}

export const fetchStream = (id) => {
  return async (disptach) => {
    const response = await streams.get(`/streams/${id}`);
    disptach({ type: FETCH_STREAM, payload: response.data })
  }
}

export const fetchStreams = () => {
  return async (disptach) => {
    const response = await streams.get('/streams');
    disptach({ type: FETCH_STREAMS, payload: response.data })
  }
}

export const deleteStream = (id) => {
  return async (disptach) => {
    const response = await streams.delete(`/streams/${id}`);
    disptach({ type: DELETE_STREAM, payload: id })
    history.push('/');
  }
}

export const editStream = (id, formValues) => {
  return async (disptach) => {
    const response = await streams.put(`/streams/${id}`, formValues);
    disptach({ type: EDIT_STREAM, payload: response.data })
    history.push('/');
  }
}