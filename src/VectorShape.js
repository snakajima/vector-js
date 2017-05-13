//
// Copyright (c) 2017 Satoshi Nakajima (https://github.com/snakajima)
// License: The MIT License
//

class VectorShape {
    static pathFromPoints(pointsIn, closed=false) {
        var points = pointsIn.map((point)=>point);
        var first = points[0];
        var last = undefined;
        const lastIndex = points.length - 1;
        if (closed) {
          last = points[lastIndex];
        } else {
          first.corner = true;
          points[lastIndex].corner = true;
        }
        var prev = undefined;
        return points.reduce((path, point, index) => {
           if (index === 0) {
             if (typeof last === 'object' && point.corner) {
               if (last.corner) {
                 path += "M" + (last.x + point.x)/2 + "," + (last.y + point.y)/2;
               } else {
                 path += "M" + point.x + "," + point.y;
               }
               prev = point;
             } else {
               path += "M" + point.x + "," + point.y;
               prev = undefined;
             }
           } else if (point.corner) {
             if (typeof prev === 'object') {
               path += "Q" + prev.x + "," + prev.y + "," + point.x + "," + point.y;
             } else {
               path += "L" + point.x + "," + point.y;
             }
             prev = undefined;
             if (index === lastIndex && typeof last === 'object' && first.corner) {
               path += "L" + first.x + "," + first.y;
             }
           } else {
             if (typeof prev === 'object') {
               path += "Q" + prev.x + "," + prev.y + "," + (prev.x + point.x)/2 + "," + (prev.y + point.y)/2;
             }
             prev = point;
             if (index === lastIndex && typeof last === 'object') {
               if (first.corner) {
                 path += "Q" + point.x + "," + point.y + "," + first.x + "," + first.y;
               } else {
                 path += "Q" + point.x + "," + point.y + "," + (point.x + first.x)/2 + "," + (point.y + first.y)/2;
               }
             }
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

    static minGap(points) {
        const count = points.length;
        const gaps = points.map((point, index) => {
            if (index === count-1) {
                return 999999;
            }
            const next = points[index+1];
            const dx = point.x - next.x;
            const dy = point.y - next.y;
            return dx*dx + dy*dy;
        })
        const minGap = gaps.reduce((minGap, gap, index) => {
            if (gap < minGap.value) {
                minGap.index = index;
                minGap.value = gap;
            }
            return minGap;
        }, { index:-1, value:999999 });
        return minGap;
    }

    static smoothing(points, ratio) {
        const rc = VectorShape.boundingRect(points);
        const t2 = (rc.width * rc.width + rc.height * rc.height) * ratio * ratio;
        while(true) {
            const minGap = VectorShape.minGap(points);
            if (minGap.value >= t2) {
                break;
            }
            const index = (minGap.index === 0) ? 1 : minGap.index;
            //console.log("splicing", index, minGap.value, t2);
            points.splice(index,1);
        }
        return points;
    }
}

export default VectorShape;
