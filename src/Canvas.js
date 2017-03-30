//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

import React, { Component } from 'react';

class Canvas extends Component {
    render() {
        const style = {
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            width:this.props.width,
            height:this.props.height
        };
        const svgStyle = {
            position: 'absolute',
            width:this.props.width,
            height:this.props.height,
            fill: 'none',
            stroke: 'rgba(0,0,0,1.0)',
            strokeWidth: 3
        };
        return <div>
            <div className='canvas' style={style} />
        {
            this.props.elements.map((element, index) => {
                           return <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 style={svgStyle} key={index}>
                           <path d={element.path} />
                           </svg>
                           })
        }
          </div>
    }
}

export default Canvas;
