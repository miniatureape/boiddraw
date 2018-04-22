
var Vector2D = new Class({
    
    Implements: [Options, Events],

    x: 0,
    y: 0,
    
    options: {
        x: 0,
        y: 0
    },
    
    initialize: function(options){
        this.setOptions(options);
        this.x = this.options.x;
        this.y = this.options.y;
    },
    
    set: function(other){
        this.x = other.x;
        this.y = other.y;
    },
    
    setArray: function(arr){
        this.x = arr[0];
        this.y = arr[1];
    },

    setCoords: function(x, y){
        this.x = x;
        this.y = y;
    },
    
    get: function(){
        return new Vector2D({x:this.x, y:this.y});
    },
    
    mag: function(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },

    add: function(other){
        this.x += other.x;
        this.y += other.y;
    },
    
    addArray: function(arr){
        this.x += arr[0];
        this.y += arr[1];
    },
    
    addCoords: function(x, y){
        this.x += x;
        this.y += y;
    },
    
    sub: function(other){
        this.x -= other.x;
        this.y -= other.y;
    },
    
    subArray: function(arr){
        this.x -= arr[0];
        this.y -= arr[1];
    },
    
    subCoords: function(x, y){
        this.x -= x;
        this.y -= y;
    },
    
    mult: function(n){
        this.x *= n;
        this.y *= n;
    },
    
    multVec: function(other){
        this.x *= other.x;
        this.y *= other.y;
    },
    
    div: function(n){
        this.x /= n;
        this.y /= n;
    },
    
    divVec: function(other){
        this.x /= other.x;
        this.y /= other.y;
    },
    
    dist: function(other){
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    },    

    dot: function(other){
        return this.x * other.x + this.y * other.y;    
    },
    
    dotCoords: function(x, y){
        return this.x * x + this.y + y
    },
    
    normalize: function(){
        var m = this.mag();
        if (m != 0 && m != 1){
            this.div(m);
        }
    },
    
    limit: function(max){      
        if (this.mag() > max){
            this.normalize();
            this.mult(max);
        }
    },
    
    heading2D: function(){
      var angle = Math.atan2(-y, x);
      return -1 * angle;
    },
    
    toString: function(){
        return "[" + this.x + "," + this.y + "y" + "]";
    }
    
})

/* "Class methods" */

var _add = function(one, other){
    var vec = new Vector2D();
    vec.setCoords(one.x + other.x, one.y + other.y);
    return vec;
}

var _sub = function(one, other){
    var vec = new Vector2D();
    vec.setCoords(one.x - other.x, one.y - other.y);
    return vec;
}

var _dist = function(one, other){
    var dx = one.x - other.x;
    var dy = one.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
}

Vector2D._add = _add;
Vector2D._sub = _sub;
Vector2D._dist = _dist;
