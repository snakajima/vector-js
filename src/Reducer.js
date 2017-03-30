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
    case 'DrawStart':
      state.draw = {path: "M" + action.x + "," + action.y, points:[{x:action.x, y:action.y}]};
      break;
   case 'DrawAppend':
      var draw = Object.assign({}, state.draw);
      draw.points = draw.points.map((point) => point);
      draw.points.push({x:action.x, y:action.y});
      const count = draw.points.length;
      const last = draw.points[count-1];
      const mid = { x:(action.x + last.x)/2, y:(action.y + last.y) / 2 };
      if (count === 3) {
          draw.path = draw.path + "Q" + last.x + "," + last.y + "," + mid.x + "," + mid.y;
      } else if (count > 3) {
          draw.path = draw.path + " " + last.x + "," + last.y + "," + mid.x + "," + mid.y;
      }
      state.draw = draw;
      break;
    case 'DrawEnd':
      console.log(state.draw.path);
      break;
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
