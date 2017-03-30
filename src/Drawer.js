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
    onDragEnd(e) {
        console.log('onDragEnd');
        DragContext.setContext({});
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
    }
    onDrag(e) {
        var context = DragContext.getContext();
        const x = e.clientX - context.left;
        const y = e.clientY - context.top;
        if (context.x !== x && context.y !== y) {
            console.log('onDrag', x, y);
            context.x = x;
            context.y = y;
            DragContext.setContext(context);
        }
    }
    
    render() {
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
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24px" height="24px" viewBox="0 0 24 24" style={{enableBackground:'new 0 0 24 24'}} >
        <path d="M12,1.3C6.1,1.3,1.3,6.1,1.3,12S6.1,22.7,12,22.7S22.7,17.9,22.7,12S17.9,1.3,12,1.3z M13.7,15.9c-0.8,1.2-1.6,2.1-3,2.1
        c-0.9-0.2-1.3-0.8-1.1-1.5l1.8-5.9c0-0.1,0-0.3-0.2-0.3c-0.1,0-0.4,0.1-0.6,0.4L9.5,12c0-0.2,0-0.6,0-0.7c0.8-1.2,2.1-2.2,3-2.2
        c0.9,0.1,1.3,0.8,1.1,1.5l-1.8,5.9c0,0.1,0,0.3,0.2,0.3c0.1,0,0.4-0.1,0.6-0.4l1.1-1.3C13.7,15.4,13.7,15.8,13.7,15.9z M13.4,8.3
        c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2C14.7,7.8,14.1,8.3,13.4,8.3z" />
        </svg>
        </div>
    }
}

export default Drawer;
