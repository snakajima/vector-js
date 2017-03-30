//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';

class Drawer extends Component {
    constructor(props) {
        super();
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }
    onDragEnd(e) {
        console.log('onDragEnd');
    }
    onDragStart(e) {
        console.log('onDragStart', e.clientX, e.clientY);
        if (typeof e.dataTransfer.setDragImage === "function") {
            e.dataTransfer.setDragImage(e.target, -10000, -10000);
        } else {
            // To hide the drag image for Microsoft Edge
            const target = e.target;
            target.style.opacity = 0;
            setTimeout(()=>{target.style.opacity = 1;});
        }
    }
    onDrag(e) {
        console.log('onDrag', e.clientX, e.clientY);
    }
    
    render() {
        return <div className='drawer'
                    style={{width:this.props.width, height:this.props.height}}
                    draggable={true}
                    onDragStart={this.onDragStart}
                    onDragEnd={this.onDragEnd}
                    onDrag={this.onDrag}>
            </div>
    }
}

export default Drawer;
