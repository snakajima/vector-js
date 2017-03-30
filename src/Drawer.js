//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import DragContext from './DragContext';

class Drawer extends Component {
    constructor(props) {
        super();
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }
    onDragStart(e) {
        console.log('onDragStart');
        if (typeof e.dataTransfer.setDragImage === "function") {
            e.dataTransfer.setDragImage(e.target, -10000, -10000);
        } else {
            // To hide the drag image for Microsoft Edge
            const target = e.target;
            target.style.opacity = 0;
            setTimeout(()=>{target.style.opacity = 1;});
        }
        const x = e.clientX - this.props.left;
        const y = e.clientY - this.props.top;
        const context = {
            left:this.props.left,
            top:this.props.top,
            x:x, y:y
        };
        DragContext.setContext(context);
        window.store.dispatch({type:'DrawStart', x:x, y:y})
    }
    onDrag(e) {
        var context = DragContext.getContext();
        if (e.clientX ===0 && e.clientY === 0) {
            return; // HACK: Don't know why we get an extra
        }
        const x = e.clientX - context.left;
        const y = e.clientY - context.top;
        if (context.x !== x && context.y !== y) {
            //console.log('onDrag', x, y);
            context.x = x;
            context.y = y;
            DragContext.setContext(context);
            window.store.dispatch({type:'DrawAppend', x:x, y:y})
        }
    }
    onDragEnd(e) {
        DragContext.setContext({});
        window.store.dispatch({type:'DrawEnd'})
    }
    
    render() {
        //console.log('render', this.props.path);
        const style = {
            width:this.props.width,
            height:this.props.height,
            left:this.props.left,
            top:this.props.top
        };
        return <div className='drawer'
                    style={style}
                    draggable={true}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                    onDrag={this.onDrag}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
            style={{width:style.width, height:style.height}}>
        <path d={this.props.draw.path || ''} />
        </svg>
        </div>
    }
}

export default Drawer;
