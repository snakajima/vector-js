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
  var draw;
    
  switch(action.type) {
    case 'DrawStart':
      state.draw = {path: "M" + action.x + "," + action.y, points:[{x:action.x, y:action.y}]};
      break;
   case 'DrawAppend':
      draw = Object.assign({}, state.draw);
      draw.points = draw.points.map((point) => point);
      draw.points.push({x:action.x, y:action.y});
      const count = draw.points.length;
      const last = draw.points[count-2];
      const mid = { x:(action.x + last.x)/2, y:(action.y + last.y) / 2 };
      if (count === 2) {
          // no-op
      } else if (count === 3) {
          draw.path = draw.path + "Q" + last.x + "," + last.y + "," + mid.x + "," + mid.y;
      } else if (count > 3) {
          draw.path = draw.path + " " + last.x + "," + last.y + "," + mid.x + "," + mid.y;
      }
      state.draw = draw;
      break;
    case 'DrawEnd':
      draw = Object.assign({}, state.draw);
      const path = draw.points.reduce((path, point, index) => {
        if (index === 0) {
          return "M" + point.x + "," + point.y;
        } else if (index === 1) {
          return path;
        }
        const last = draw.points[index-1];
        const mid = { x:(point.x + last.x)/2, y:(point.y + last.y) / 2 };
        path += (index === 2) ? "Q" : " ";
        path += last.x + "," + last.y + ",";
        if (index < draw.points.length-1) {
          path += mid.x + "," + mid.y;
        } else {
          path += point.x + "," + point.y;
        }
        return path;
      }, "");
      //console.log(path);
      //console.log(state.draw.path);
      var paths = (state.paths || []).map((path) => path);
      paths.push(path);
      state.paths = paths;
      state.draw = {};
      state.drawMode = false;
      undoable = true;
      break;
    case 'AddElement':
      state.drawMode = true;
      break;
    case 'setState':
      state = action.state;
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
