//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';

class MenuBar extends Component {
    render() {
        return <div className='menubar'>
        <input className={window.stack.undoable() ? "btn" : "btnIA"} type="image"
        src="./ic_color_undo.png"
        onClick={ () => {window.stack.undo(window.store)} } />
        <input className={window.stack.redoable() ? "btn" : "btnIA"} type="image"
        src="./ic_color_redo.png"
        onClick={ () => {window.stack.redo(window.store)} } />
        <input className="btn" type="image"
        src="./ic_color_plus.png"
        onClick={ () => {window.store.dispatch({type:'addElement'})} } />
          </div>
    }
}

export default MenuBar;
