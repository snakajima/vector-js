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
        const points = this.props.element.points;
        return <div>
          <div className='points' style={style} />
            {
            points.map((point, index) => {
               const style = {left:point.x, top:point.y};
               return <div key={index} className='pointer' style={style}></div>
            })
            }
          </div>
    }
}

export default Points;
