//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';
import Drawer from './Drawer';

class Canvas extends Component {
    render() {
        return <div className='canvas' style={{width:this.props.width, height:this.props.height}}>
            <Drawer width={this.props.width} height={this.props.height} />
            </div>
    }
}

export default Canvas;
