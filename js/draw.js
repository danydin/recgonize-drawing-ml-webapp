const draw = {};

draw.path=(ctx,path,color="black")=>{
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
    // ensure that each path is drawn independently
    ctx.beginPath();
    //  sets the starting point of the path to the specified coordinates (x, y) without drawing anything. In this case, path[0] contains an array with the coordinates [x, y] of the starting point of the line, the ... spread operator will output the elements from the given array/object/string 1 by 1
    ctx.moveTo(...path[0]);
    // This loop iterates over the remaining points in the path array (starting from index 1) and connects them with straight lines using the ctx.lineTo(x, y) method. For each point in the path array, it draws a line from the current drawing position (the last point drawn or the starting point set by moveTo()) to the coordinates specified by the point in the path array
    for (let i=1;i<path.length;i++){
        ctx.lineTo(...path[i]);
    }
    // astehtics of the line
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.stroke();
}

draw.paths=(ctx,paths,color="black")=>{
    for(const path of paths){
        draw.path(ctx,path,color)
    }
}