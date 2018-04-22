

var Circle = new Class({
    
    context: null,
    rad: 0,
    
    Implements: [Options, Events],

    options: {
        pos: new Vector2D(),        
        fill: "rgba(100,100,100,100)",
        alpha: 255,
        alphaDelta: 1,
        rad:1,
        delta: .1,
        maxrad: 20
    },
    
    initialize: function(options){
        this.setOptions(options);
        this.rad = this.options.rad;
        this.alpha = this.options.alpha;
        this.pos = options.pos;
        this.fill = this.options.fill;
	this.delta = this.options.delta;
        this.alphaDelta = this.options.alphaDelta;
	this.maxrad = this.options.maxrad;	
    },
    
    render: function(context){
        this.update();
        context.save();
	context.fillStyle = this.fill;
	context.arc(this.pos.x, this.pos.y, this.rad, 0, 2*Math.PI, true);
	context.fill();
        context.restore();
    },
    
    update: function(){
        this.rad += this.delta;
        var parts = Canvas.colorSplit(this.fill);
        parts[parts.length - 1] -= this.alphaDelta;
        this.fill = Canvas.colorJoin(parts);        
    },
    
    done: function(){
        if(this.rad < this.maxrad){	    
            return false;
        } else {
            return true;
        }
    }
    
});