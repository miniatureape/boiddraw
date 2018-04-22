var Line = new Class({
    
    Implements: [Options, Events],
    startPos: null,
    endPos: null,
    
    options: {
	innerFill: "rgba(100,100,100,1)",
	outerFill: "rgba(200,200,200,1)",
	alphaDelta: .07,
	rad: 8
    },
    
    initialize: function(options){
        this.startPos = options.startPos;
        this.endPos = options.endPos;
	this.innerFill = this.options.innerFill;
	this.outerFill = this.options.outerFill;
	this.alphaDelta = this.options.alphaDelta;
	this.rad = this.options.rad;
    },
    
    render: function(context){
        if(this.endPos == null) return;	
	this.update();
        context.save();
        context.strokeStyle = this.outerFill;
        context.lineCap = "round";
        context.lineWidth = this.rad;
        context.beginPath();
	context.moveTo(this.startPos.x,this.startPos.y);
	context.lineTo(this.endPos.x, this.endPos.y);
	context.stroke();
	context.closePath();
    
        context.strokeStyle = this.innerFill;
        context.lineWidth = 1;
        context.beginPath();	
        context.moveTo(this.startPos.x,this.startPos.y);        
        context.lineTo(this.endPos.x,this.endPos.y);
        context.stroke();
	context.closePath();
	context.restore();
    },
    
    fade: function(){
	this._fade = true;
    },
    
    update: function(){
	if(this._fade){
	    
            var outer = Canvas.colorSplit(this.outerFill);
	    var inner = Canvas.colorSplit(this.innerFill);
            
            outer[3] -= this.alphaDelta;
            inner[3] -= this.alphaDelta;
            
            if(inner[3] <= 0 || outer[3] <= 0){
                this._fade = false;
                inner[3] = 0;
                outer[3] = 0;
            }

	    this.outerFill = Canvas.colorJoin(outer);
	    this.innerFill = Canvas.colorJoin(inner);
            
	}
    }

});