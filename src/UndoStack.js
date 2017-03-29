//
// Copyright (c) 2016 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

class UndoStack {
    constructor() {
        this.states = [];
        this.index = -1;
    }

    reset() {
      this.states = [];
      this.index = -1;
      location.hash = 0;
    }
    undoable() {
        return this.index > 0;
    }

    redoable() {
        return this.index+1 < this.states.length;
    }

    append(state) {
        this.states = this.states.slice(0,this.index+1);
        this.states.push(state);
        this.index++;
        location.hash = this.index;
    }

    undo(store) {
        if (this.undoable()) {
            this.index--;
            const state = this.states[this.index];
            store.dispatch({type:'setState', state:state});
            location.hash = this.index;
        }
    }

    redo(store) {
        if (this.redoable()) {
            this.index++;
            const state = this.states[this.index];
            store.dispatch({type:'setState', state:state});
            location.hash = this.index;
        }
    }
    go(store, num) {
        if (this.canGo(num)) {
            this.index = num;
            const state = this.states[this.index];
            store.dispatch({type:'setState', state:state});
        }
    }
    canGo(num) {
        return (0 < num && num <= this.states.length);
    }
}

export default UndoStack;
