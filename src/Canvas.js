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
        return <div>
            <div className='canvas' style={style} />
        {
            this.props.paths.map((path, index) => {
                           return <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 style={style} key={index}>
                           <path d={path} />
                           </svg>
                           })
        }
          </div>
    }
}

export default Canvas;
