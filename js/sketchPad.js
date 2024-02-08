class SketchPad{
    constructor(container, size=400){
        // attribute of this class
        this.canvas=document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0 0 10px 2px black;
        `;
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.paths=[];

        this.isDrawing = false; 

        // detect mouse actions in a private method - can't be called from outside this class
        this.#addEventListener();
    }

    #addEventListener(){
        this.canvas.onmousedown=(evt)=>{
            const mouse = this.#getMouse(evt);
            // console.log(mouse)
            this.paths.push([mouse]);
            console.log(this.paths);
            this.isDrawing = true;
        }
        // so it not draw if just hover with the mouse
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length-1];
                lastPath.push(mouse);
                this.#reDraw();
                // console.log(this.paths.length)
            }
        }
        this.canvas.onmouseup=()=>{
            this.isDrawing=false;
        }
        // event listeners for touch screens / mobile 
        this.canvas.ontouchstart=(evt)=>{
            // console.log(evt);
            const loc = evt.touches[0]; 
            console.log(loc);
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove=(evt)=>{
            // console.log(evt);
            const loc = evt.touches[0]; 
            console.log(loc);
            this.canvas.onmousemove(loc);
        }
        this.canvas.ontouchend=(evt)=>{
            // console.log(evt);
            this.canvas.onmouseup();
        }
    }

    #getMouse=(evt)=>{
        const rect = this.canvas.getBoundingClientRect();
        return [
            // clientX & clientY comes from the eventlistener object , the coordinates caclualtes relative to the size of the canvas
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)
        ];
    }

    #reDraw(){
        this.ctx.clearRect(0,0,
            this.canvas.width,this.canvas.height);
            draw.paths(this.ctx,this.paths);
    }
}