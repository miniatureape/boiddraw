
var Canvas = new Class({

    Implements: [Options, Events],
    
    canvas: null,
    buffer: null,
    downPos: new Vector2D(),
    binder: {},
    context: null,
    circles: [],
    boids: [],
    line: null,
    counter: 0,
    path:null,
    
    initialize: function(options){
        this.setOptions(options);
        if(this.options.canvas == null){
            this.canvas = $('canvas');
            this.buffer = $('osb');
        } else {
            this.canvas = options.canvas;
            this.buffer = options.osb;
        }
        this.numboids = 1;
        this.maxForce = 3;
        this.maxSpeed = 10;
        this.circles = [];
        this.boids = [];
        this.canvas.addEvent('mousedown', this.mouseDown.bind(this));
        this.canvas.addEvent('mouseup', this.mouseUp.bind(this));
        this.context = this.canvas.getContext('2d');
        this.buffer = this.buffer.getContext('2d');
    },
    
    createBoids: function(downPos){
        
        for(var i = 0; i < this.numboids; i++){
            var paint = this.getColor(i);
            var pos = new Vector2D(downPos);
            var maxSpeed = this.maxSpeed + (Math.random() * 5);
            var maxForce = this.maxForce;
            pos.addCoords(Math.random() * 10, Math.random() * 10);
            //var vel = new Vector2D(Math.random() * 5, Math.random() * 5);
            var vel = Vector2D._sub(this.path.points[1], this.path.points[0]);
            this.boids.push(new Boid({pos: pos,
                                 maxSpeed:maxSpeed,
                                 maxForce:maxForce,
                                 vel: vel,
                                 paint: paint
                                }));
        }
    },
    
    getColor: function(index){
        var boidcolors = $('boidcolors').getElements('select');
        var rgb = boidcolors[index].value.hexToRgb(true);
        rgb[3] = 1;
        return Canvas.colorJoin(rgb);
    },
    
    mouseDown: function(event){
        this.boids.empty();
        var localpos = this.localPosition(event);
        this.downPos.setCoords(localpos.x, localpos.y);
        this.path = new Path();
        this.path.points.push(this.downPos.get());

        binder = this.mouseMove.bind(this);
        this.canvas.addEvent('mousemove', binder);        
    },

    
    mouseUp: function(event){
        this.counter = 0;
        this.canvas.removeEvent('mousemove', binder);
        this.path.fade();
        this.createBoids(this.downPos);        
    },
    
    localPosition: function(event){
        return {x: event.client.x - this.canvas.getPosition().x,
                y: event.client.y - this.canvas.getPosition().y}    
    },
    
    mouseMove: function(event){
        this.counter++        
        if(this.counter % 10 == 0){
            var pos = new Vector2D(this.localPosition(event).x,
                                        this.localPosition(event).y)
            this.path.points.push(new Vector2D({x:this.localPosition(event).x, y:this.localPosition(event).y}));
        }
    },

    doCircles: function(){        
        for(var i = 0; i < this.circles.length; i++){
            var circle = this.circles[i];
            circle.render(this.context);
            if(circle.done()){
                this.circles.erase(circle);
                circle = null;                
            }
        }
    },
    
    doLine: function(){
      this.line.render(this.context);  
    },
    
    doBoids: function(){
        for(var i = 0; i < this.boids.length; i++){
            var boid = this.boids[i];
            boid.follow(this.path);
            boid.render(this.context, this.buffer);
        }
    },
    
    clear: function(){
        this.context.clearRect(0,0,this.canvas.getSize().x, this.canvas.getSize().y);
    },
    
    renderBoidLines: function(){
        var width = this.canvas.getSize().x;
        var height = this.canvas.getSize().y;
        var img = this.buffer.getImageData(0,0, 500, 500);
        this.context.putImageData(img, 0, 0, this.canvas.getSize().x, this.canvas.getSize().y);
        
    },
    
    doPath: function(){
        this.path.render(this.context);
    },
    
    render: function(){
        this.clear();
        //this.renderBoidLines();
        //this.doCircles();
        //if(this.line != null) this.doLine();
        if(this.path != null) this.doPath();
        this.doBoids();
    }
    
});

var colorSplit = function(str){
    var start = str.indexOf('(');
    var end = str.indexOf(')');
    var values = str.slice(start + 1, end);
    var bits = values.split(',');
    bits.each(function(bit){
        Number(bit);
    });
    return bits;
}

var colorJoin = function(bits){
    var str = bits.length > 3 ? 'rgba(' : 'rgb(';
    for(var i = 0; i < bits.length; i++){
        str += bits[i];
        if(i != bits.length - 1) str += ",";
    }
    return str += ')';
}

Canvas.colorSplit = colorSplit;
Canvas.colorJoin = colorJoin;
