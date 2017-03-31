//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';

class AnchoPoints extends Component {
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
                return <div key={index} className='pointHandle' style={style}></div>
            })
            }
          </div>
    }
}

export default AnchoPoints;
