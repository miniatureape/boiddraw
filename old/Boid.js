


var Boid = new Class({

    Implements: [Options, Events],
    
    pos: new Vector2D(),
    acc: new Vector2D(),
    vel: new Vector2D(),
    maxSpeed: 0,
    maxForce: 0,
    size: 10,
    
    options: {
        pos: new Vector2D({x:0, y:0}),
        acc: new Vector2D({x:0, y:0}),
        vel: new Vector2D({x:0, y:0}),
        maxSpeed: 10,
        maxForce: 10,
        size: 10,
        fill: "rgba(255,0,0,100)",
        paint: "rgba(200,200,200,30)"
    },
    
    initialize: function(options){
        this.setOptions(options);
        this.pos = this.options.pos;
        this.vel = options.vel;
        this.maxSpeed = options.maxSpeed;
        this.maxForce = options.maxForce;
        this.size = this.options.size;
        this.fill = this.options.fill;
        this.paint = options.paint;
    },
    
    run: function(){
        this.update();
        this.render();
    },
    
    getNormalPoint: function(point, a, b){
        var ap = Vector2D._sub(point,a);
        var ab = Vector2D._sub(b,a);
        ab.normalize();
        ab.mult(ap.dot(ab));
        var normalPoint = Vector2D._add(a,ab);
        return normalPoint;
    },
    
    follow: function(path){
        var prediction = this.vel.get();
        prediction.normalize();
        prediction.mult(25);
        var predictedPos = Vector2D._add(this.pos, prediction);
        var target = null;
        var dir = null;
        var record = 1000000; // aritrary high num
        
        var points = path.points;
        
        for(var i = 0; i < points.length - 1; i++){
            var c = points[i];
            var n = points[i+1];

            var normal = this.getNormalPoint(predictedPos, c, n);
            
            var dc = Vector2D._dist(normal, c);
            var dn = Vector2D._dist(normal, n);
            
            var line = Vector2D._sub(c,n);
                        
            if(dc + dn > line.mag() + 1){
                normal = n.get();
            }
            
            var d = Vector2D._dist(predictedPos, normal);
            
            if(d < record){
                record = d;
                target = normal;
            }
            
            dir = line;
            dir.normalize();
            dir.mult(10);            
        }
        
        if(record > path.rad){
            target.add(dir);
            this.seek(target);
        }
        
    },
    
    render: function(context, buffer){
        this.update();
        this.renderUntoBuffer(buffer);
    },
    
    renderUntoBuffer: function(buffer){
        if(this.lastPos){
            buffer.save();
            buffer.beginPath();
            buffer.lineWidth = this.simulatePressureWidth(this.vel);
            buffer.strokeStyle = this.simulatePressure(this.paint, this.vel);            
            buffer.moveTo(this.lastPos.x, this.lastPos.y);
            buffer.lineTo(this.pos.x, this.pos.y);
            buffer.stroke();
            buffer.closePath();
            buffer.restore();
        }
        this.lastPos = this.pos.get();        
    },
    
    simulatePressure: function(paint){
        // adjust alpha depending on boids velocity
        parts = Canvas.colorSplit(paint);
        parts[3] = .6 * ((this.vel.mag()) / this.maxSpeed);
        return Canvas.colorJoin(parts);
    },
    
    simulatePressureWidth: function(){
        return   1.1 * (this.vel.mag() / this.maxSpeed);
    },
    
    update: function(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    },
    
    seek: function(target){
        this.acc.add(this.steer(target, false));
    },
    
    arrive: function(target){
        this.acc.add(this.steer(target, true));
    },
    
    steer: function(target, slowdown){
        var steer;
        var desired = Vector2D._sub(target, this.pos);
        var desmag = desired.mag();
        if(desmag > 0){
            desired.normalize();
            if(slowdown && (d < 100)){
                desired.mult(this.maxSpeed*(desmag/100)); // arbitrary damping                
            } else {
                desired.mult(this.maxSpeed);
            }
            steer = Vector2D._sub(desired, this.vel);
            steer.limit(this.maxForce);
        }
        return steer;
    },
    
    toString: function(){
        return "Boid at " + this.pos.toString();
    }
    
})
