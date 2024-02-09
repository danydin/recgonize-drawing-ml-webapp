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

        const br = document.createElement("br");
        container.appendChild(br);

        // we use this.undoBtn below vs const in the br element above because const creates a local variable within the constructor's scope only, while this. make the property accessible throughout the class. The choice between them depends on whether you need the button element to be accessible only within the constructor or throughout the entire class.
        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext("2d");

        this.reset();

        // a private method - can't be called from outside this class
        this.#addEventListener();
    }

    reset(){
        this.paths=[];
        this.isDrawing = false; 
        // call it to disable the undo button on page refresh
        this.#reDraw();
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
                // access the last position in the paths array
                const lastPath = this.paths[this.paths.length-1];
                // extends the path with the new position as the user moves the mouse
                lastPath.push(mouse);
                // redrawing the entire canvas with the updated paths
                this.#reDraw();
            }
        }
        document.onmouseup=()=>{
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
            const loc = evt.touches[0]; 
            console.log(loc);
            this.canvas.onmousemove(loc);
        }
        this.canvas.ontouchend=(evt)=>{
            document.onmouseup();
        }

        this.undoBtn.onclick=()=>{
            this.paths.pop();
            this.#reDraw();
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
            if(this.paths.length>0){
                this.undoBtn.disabled=false;
            } else {
                this.undoBtn.disabled=true; 
            }
    }
}