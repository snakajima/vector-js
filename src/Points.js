//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';

class Points extends Component {
    render() {
        const style = {
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            width:this.props.width,
            height:this.props.height
        };
        return <div>
            <div className='points' style={style} />
          </div>
    }
}

export default Points;
