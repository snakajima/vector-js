//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import DragContext from './DragContext';

class AnchoPoints extends Component {
    constructor(props) {
        super();
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }
    onDragStart(e, index) {
        if (typeof e.dataTransfer.setDragImage === "function") {
            e.dataTransfer.setDragImage(e.target, -10000, -10000);
        } else {
            // To hide the drag image for Microsoft Edge
            const target = e.target;
            target.style.opacity = 0;
            setTimeout(()=>{target.style.opacity = 1;});
        }
        const context = {
          point:this.props.element.points[index],
          x:e.clientX, y:e.clientY,
          dx:0, dy:0,
          index:index
        };
        DragContext.setContext(context);
    }
    onDrag(e) {
        var context = DragContext.getContext();
        const dx = e.clientX-context.x;
        const dy = e.clientY-context.y;
        if (e.buttons > 0 && context.dx !== dx && context.dy !== dy) {
            context.dx = dx;
            context.dy = dy;
            DragContext.setContext(context);
            var point = Object.assign({}, context.point);
            point.x += dx;
            point.y += dy;
            window.store.dispatch({type:'anchorDragged', point:point, index:context.index})
        }
    }
    onDragEnd(e) {
        console.log("onDragEnd", e.clientX, e.clientY);
        DragContext.setContext({});
        window.store.dispatch({type:'anchorDropped'})
    }
    render() {
        const style = {
            left: this.props.left,
            top: this.props.top,
            width:this.props.width,
            height:this.props.height
        };
        const points = this.props.element.points;
        const r = 10;
        return <div className='points' style={style} >
            {
            points.map((point, index) => {
                const style = {
                   left:point.x - r/2,
                   top:point.y - r/2,
                   width:r,
                   height:r,
                   borderRadius:r/2
                };
                return <div key={index} className='pointHandle' style={style}
                           draggable={true}
                           onDragStart={(e) => this.onDragStart(e, index)}
                           onDragEnd={this.onDragEnd}
                           onDrag={this.onDrag}>
                       </div>
            })
            }
          </div>
    }
}

export default AnchoPoints;
