//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import Reducer from './Reducer';
import createStore from './SimpleRedux';
import UndoStack from './UndoStack';
import Canvas from './Canvas';
import Drawer from './Drawer';
import './App.css';

window.stack = new UndoStack();
window.store = createStore(Reducer.reducer);

class App extends Component {
    constructor() {
        super();
        window.store.setApplication(this);
    }
    
  render() {
      const draw = this.state.draw || {};
      const paths = this.state.paths || [];
      return <div>
        <Canvas width={400} height={300} left={100} top={10} paths={paths} />
        <Drawer width={400} height={300} left={100} top={10} draw={draw} />
      </div>
  }
}

export default App;
