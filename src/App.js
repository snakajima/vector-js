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
import Points from './Points';
import MenuBar from './MenuBar';
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
      const elements = this.state.elements || [];
      return <div>
        <MenuBar />
        <Canvas width={400} height={300} left={0} top={30} elements={elements} />
      {
        (this.state.drawMode) ?
          <Drawer width={400} height={300} left={0} top={30} draw={draw} /> : ''
      }
      {
          (typeof this.state.selection !== 'undefined' && this.state.selection >= 0) ?
          <Points width={400} height={300} left={0} top={30} element={this.state.elements[this.state.selection]} /> : ''
      }
      </div>
  }
}

export default App;
