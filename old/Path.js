
var Path = new Class({
    Implements: [Options, Events],
    
    points: [],
    
    options: {
        rad: 10,
        outerFill: "rgba(200,200,200,1)",
        innerFill: "rgba(100,100,100,1)",
        alphaDelta: .08
    },
    
    initialize: function(options){
        this.setOptions();
        this.rad = this.options.rad;
        this.outerFill = this.options.outerFill;
        this.innerFill = this.options.innerFill;
        this.alphaDelta = this.options.alphaDelta;
    },
    
    addPoint: function(newpoints){
        this.points.extend(newpoints);
    },
    
    render: function(context){
        this.update();

        for(var i = 1; i < this.points.length - 1; i++){
            context.save();
            context.strokeStyle = this.outerFill;
            context.lineCap = "round";
            context.lineWidth = this.rad;
            context.beginPath();
            context.moveTo(this.points[i - 1].x,this.points[i - 1].y);
            context.lineTo(this.points[i].x, this.points[i].y);
            context.stroke();
            context.closePath();
            
            context.strokeStyle = this.innerFill;
            context.lineWidth = 1;
            context.beginPath();	
            context.moveTo(this.points[i - 1].x,this.points[i - 1].y);
            context.lineTo(this.points[i].x, this.points[i].y);
            context.stroke();
            context.closePath();
            context.restore();
        };  
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
