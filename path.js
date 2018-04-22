function Path(points) {

    return {

        points: points || [],

        addPoints: function(points) {
            this.points.concat(points);
            return this;
        },

        addPoint: function(point) {
            this.points.push(point);
            return this;
        },

        clear: function() {
            this.points = [];
            return this;
        },

        copy: function() {
            return new Path(this.points.slice(0));
        }
    }

}
