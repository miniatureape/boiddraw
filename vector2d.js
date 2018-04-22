/*
Copyright (c) 2010 Justin Donato <justin.donato@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Vector2d = function(x, y) {
    this.x = x;
    this.y = y;
}
Vector2d.prototype = {

    initialize: function(x, y) {
        this.x = x;
        this.y = y;
    },
    
    set: function(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    },
    
    setArray: function(arr) {
        this.x = arr[0];
        this.y = arr[1];
        return this;
    },

    setCoords: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },
    
    get: function() {
        return new Vector2d(this.x, this.y);
    },
    
    mag: function() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    },

    add: function(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    },
    
    addArray: function(arr) {
        this.x += arr[0];
        this.y += arr[1];
        return this;
    },
    
    addCoords: function(x, y) {
        this.x += x;
        this.y += y;
        return this;
    },
    
    sub: function(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    },
    
    subArray: function(arr) {
        this.x -= arr[0];
        this.y -= arr[1];
        return this;
    },
    
    subCoords: function(x, y) {
        this.x -= x;
        this.y -= y;
        return this;
    },
    
    mult: function(n) {
        this.x *= n;
        this.y *= n;
        return this;
    },

    scale: function(n) {
        this.mult(n);
        return this;
    },
    
    multVec: function(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    },
    
    div: function(n) {
        this.x /= n;
        this.y /= n;
        return this;
    },
    
    divVec: function(other) {
        this.x /= other.x;
        this.y /= other.y;
        return this;
    },
   
    dist: function(other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    },    

    dot: function(other) {
        return this.x * other.x + this.y * other.y;    
    },
    
    dotCoords: function(x, y) {
        return this.x * x + this.y + y
    },
    
    normalize: function() {
        var m = this.mag();
        if (m != 0 && m != 1) {
            this.div(m);
        }
        return this;
    },
    
    limit: function(max) {      
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
        return this;
    },
    
    heading2d: function() {
      var angle = Math.atan2(-y, x);
      return -1 * angle;
    },

    rotate: function(rads) {
        var s = Math.sin(rads);
        var c = Math.cos(rads);
        var xrot = (c * this.x) - (s * this.y);
        this.y = (s * this.x) + (c * this.y);
        this.x = xrot;
        return this;
    },

    angle: function(other) {
        return Math.acos(this.dot(other) / (this.mag() * other.mag()));
    },

    normal: function() {
        var temp = this.vector.x;
        this.x = -this.vector.y;
        this.y = temp;
        return this;
    },

    random: function(mag) {
        this.x = Math.random();
        this.y = Math.random();
        if (mag) this.scale(mag);
        return this;
    },

    zero: function() {
        this.x = 0;
        this.y = 0;
    },

    equals: function(other) {
        return this.x === other.x && this.y === other.y
    },
    
    toString: function() {
        return "[" + this.x + "," + this.y + "]";
    }
    
};

/* Static methods */

Vector2d.add = function(one, other) {
    var vec = new Vector2d();
    vec.setCoords(one.x + other.x, one.y + other.y);
    return vec;
}

Vector2d.sub = function(one, other) {
    var vec = new Vector2d();
    vec.setCoords(one.x - other.x, one.y - other.y);
    return vec;
}

Vector2d.dist = function(one, other) {
    var dx = one.x - other.x;
    var dy = one.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
}

Vector2d.random = function(mag) {
    var vec = new Vector2d(Math.random(), Math.random());
    if (mag) vec.scale(mag);
    return vec;
}

Vector2d.mult = function(one, scalar) {
    var vec = new Vector2d(one.x, one.y);
    vec.x *= scalar;
    vec.y *= scalar
    return vec;
}

Vector2d.normal = function(vec) {
    return new Vector2d(-vec.y, vec.x);
}

Vector2d.normalize = function(vec) {
    var v = new Vector2d(vec.x, vec.y);
    var m = v.mag();
    if (m != 0 && m != 1) {
        v.div(m);
    }
    // TODO, you should probably throw an error in an else
    return v;
}

Vector2d.componentVector = function(vec, directionVec) {
    directionVec.normalize();
    directionVec.mult(vec.dot(directionVec));
    return directionVec;
}

