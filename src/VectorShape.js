//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

class VectorShape {
    static pathFromPoints(points) {
        const count = points.length;
        return points.reduce((path, point, index) => {
           if (index === 0) {
               return "M" + point.x + "," + point.y;
           } else if (index === 1) {
               return path;
           }
           const last = points[index-1];
           const mid = { x:(point.x + last.x)/2, y:(point.y + last.y) / 2 };
           path += (index === 2) ? "Q" : " ";
           path += last.x + "," + last.y + ",";
           if (index < count-1) {
               path += mid.x + "," + mid.y;
           } else {
               path += point.x + "," + point.y;
           }
           return path;
       }, "")
    }
    
    static boundingRect(points) {
        var minmax = {
        xMax: points[0].x,
        xMin: points[0].x,
        yMax: points[0].y,
        yMin: points[0].y,
        }
        minmax = points.reduce((minmax, point) => {
           minmax.xMax = Math.max(minmax.xMax, point.x);
           minmax.xMin = Math.min(minmax.xMin, point.x);
           minmax.yMax = Math.max(minmax.yMax, point.y);
           minmax.yMin = Math.min(minmax.yMin, point.y);
           return minmax;
       }, minmax);
        return { x:minmax.xMin, y:minmax.yMin,
            width:minmax.xMax - minmax.xMin, height:minmax.yMax - minmax.yMin };
    }
}

export default VectorShape;