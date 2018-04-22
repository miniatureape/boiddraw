function PathRenderer(path, context) {
    return {

        path: path,

        run: function(debug) {
            if (this.path.points.length) {
                context.beginPath();
                context.moveTo(this.path.points[0].x, this.path.points[0].y);
                this.path.points.forEach(function(point) {
                    context.lineTo(point.x, point.y);
                });
                context.stroke();
            }
        }

    }
}
