//
// Copyright (c) 2016 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//


function reducer(_state, action) {
  // The elementMap maps the element id to index.
  // We store it as a property of the state only for convenience.
  /*
  function elementMap(elements) {
    return elements.reduce((map, v, index)=>{
                            map[v.id] = index;
                            return map;
                           }, {});
  }
  */

  console.log(_state, action);
  if (typeof _state === "undefined") {
    var initialState = {};
    window.stack.append(initialState);
    return initialState;
  }
    
  // *** NOTE: IMPORTANT ***
  // In order to enable undo and redo, we must strictly follow the Redux guideline.
  // Do not modify the state object or its sub-objects (no side effect).
  var state = Object.assign({}, _state);
  var undoable = false;
    
  switch(action.type) {
      default:
          console.log("unknown type:", JSON.stringify(action));
          break;
  }
  if (undoable) {
    window.stack.append(state);
  }
  //state.elementMap = elementMap(state.canvas.elements);
  return state
}

module.exports = { reducer };
