//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import Drawer from './Drawer';

class Canvas extends Component {
    render() {
        const style = {
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            width:this.props.width,
            height:this.props.height
        };
        return <div>
            <div className='canvas' style={style}>
            </div>
            <Drawer width={this.props.width} height={this.props.height}
                left={this.props.left} top={this.props.top} />
        </div>
    }
}

export default Canvas;
