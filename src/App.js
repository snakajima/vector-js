//
// Copyright (c) 2016 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import createStore from './SimpleRedux';
import './App.css';

//window.store = createStore(Reducer.reducer);

class App extends Component {
  render() {
      return <p>Hello World</p>
  }
}

export default App;
