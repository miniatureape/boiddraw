function Boid(path, pos, vel, acc, settings) {

    return {

        path: path,

        pos: pos || new Vector2d(0,0),
        acc: acc || new Vector2d(0,0),
        vel: vel || new Vector2d(0,0),
        age: 0,
        lastpos: null,

        ageLimit: settings.get('ageLimit'),
        pathWidth: settings.get('pathWidth'),
        maxSpeed: settings.get('maxSpeed') + (Math.random() * 6),
        maxForce: settings.get('maxForce'),
        predictionLength: settings.get('predictionLength'),
        damping: settings.get('damping'),

        follow: function() {

            let target = null;
            let dir = null;

            let prediction = this.vel.get();

            prediction.normalize();
            prediction.mult(this.predictionLength);

            let predictedPos = Vector2d.add(this.pos, prediction);
            let record = Infinity
            
            let points = this.path.points;
            
            for (let i = 0; i < points.length - 1; i++) {

                let current = points[i];
                let next = points[i+1];

                let normal = this.getNormalPoint(predictedPos, current, next);
                
                let distCurrent = Vector2d.dist(normal, current);
                let distNext = Vector2d.dist(normal, next);
                
                let line = Vector2d.sub(current, next);
                            
                if (distCurrent + distNext > line.mag() + 1) {
                    normal = next.get();
                }
                
                let dist = Vector2d.dist(predictedPos, normal);
                
                if (dist < record) {
                    record = dist;
                    target = normal;
                }
                
                dir = line;
                dir.normalize();
                dir.mult(10);
            }
            
            if (record > this.pathWidth) {
                target.add(dir);
                this.seek(target);
            }
        },


        steer: function(target, slowdown) {
            let steer;
            let desired = Vector2d.sub(target, this.pos);
            let desiredMag = desired.mag();

            if (desiredMag > 0) {

                desired.normalize();

                if (slowdown && (d < this.damping)) {
                    desired.mult(this.maxSpeed * (desiredMag / DAMPING));
                } else {
                    desired.mult(this.maxSpeed);
                }

                steer = Vector2d.sub(desired, this.vel);
                steer.limit(this.maxForce);
            }

            return steer;
        },

        seek: function(target) {
            this.acc.add(this.steer(target, false));
        },

        getNormalPoint: function(point, a, b) {
            let ap = Vector2d.sub(point,a);
            let ab = Vector2d.sub(b,a);
            ab.normalize();
            ab.mult(ap.dot(ab));
            let normalPoint = Vector2d.add(a,ab);
            return normalPoint;
        },

        run: function(debug) {
            this.age++;
            this.lastpos = this.pos.get();
            this.follow();

            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
            if (this.age > this.ageLimit) return true;
        }

    }
}

function BoidRenderer(boid, context, paint, size) {
    return {
        run: function(debug) {
            let result = boid.run(debug);
            if (!boid.lastpos) return;
            context.save();
            context.beginPath();
            context.lineWidth = this.simulatePressureWithLineWidth(boid);
            context.strokeStyle = this.simulatePressureWithStroke(paint, boid);
            context.moveTo(boid.pos.x, boid.pos.y);
            context.lineTo(boid.lastpos.x, boid.lastpos.y);
            context.stroke();
            context.closePath();
            context.restore();
            return result;
        },

        simulatePressureWithLineWidth: function(boid) {
            return   size * (boid.vel.mag() / boid.maxSpeed);
        },
        simulatePressureWithStroke: function(paint, boid) {
            parts = colorSplit(paint);
            parts[3] = Math.max(.1, .4 * ((boid.vel.mag()) / boid.maxSpeed));
            return colorJoin(parts);
        },
    };
}

function Flock(context, path, settings) {
    const SPEED_MULTIPLIER = 5;

    let flock = [];
    let points = path.points;
    let first = points[0];
    let second = points[0];

    for (let i = 0; i < settings.get('numboids'); i++) {
        let start = Vector2d.add(first, Vector2d.random(10));
        let vel = Vector2d.sub(second, first);
        let boid = Boid(
            path, 
            start, 
            vel,
            null,
            settings
        );
        let paint = settings.get('pallete')[i % settings.get('pallete').length];
        let boidRenderer = BoidRenderer(boid, context, paint, settings.get('boidSize'));
        flock.push(boidRenderer);
    }
    return flock;
}
