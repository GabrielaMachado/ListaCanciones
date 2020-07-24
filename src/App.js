import React, { Component } from 'react';
import Songs from './components/songs';
import SongsForm from './components/songsForm';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/newSong/:id" component={SongsForm} />
          <Route path="/" component={Songs} />
        </Switch>
      </div>
    );
  }
}

export default App;
