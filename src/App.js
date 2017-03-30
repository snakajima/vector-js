//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import Reducer from './Reducer';
import createStore from './SimpleRedux';
import UndoStack from './UndoStack';
import Canvas from './Canvas';
import './App.css';

window.stack = new UndoStack();
window.store = createStore(Reducer.reducer);

class App extends Component {
  render() {
      return <Canvas width={400} height={300} left={100} top={10} />
  }
}

export default App;
