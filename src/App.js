import React, { Component } from 'react';
import Game from './component/Game';
import Rules from './component/Rules'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        <Rules />
      </div>
    );
  }
}

export default App;
