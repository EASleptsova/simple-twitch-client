import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/"> <StreamList /></Route>
          <Route exact path="/streams/new"> <StreamCreate /></Route>
          <Route exact path="/streams/delete/:id"> <StreamDelete /></Route>
          <Route exact path="/streams/edit/:id"> <StreamEdit /></Route>
          <Route exact path="/streams/:id"> <StreamShow /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App