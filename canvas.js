function Canvas(context) {

    function eventToVector(fn) {
        return function(e) {
            let thing = e.touches ? e.touches[0] : e;
            fn(new Vector2d(thing.clientX, thing.clientY));
        }
    }

    return {

        name: 'canvas',

        context: context,
        canvas: context.canvas,

        resize: function(width, height) {
            this.context.canvas.setAttribute('width', width);
            this.context.canvas.setAttribute('height', height);
        },

        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        bindEventsToStylus: function(stylus) {
            let moveHandler = eventToVector(function(v) { stylus.move(v) });
            this.canvas.addEventListener('mousedown', stylus.start.bind(stylus))
            this.canvas.addEventListener('mousemove', moveHandler.bind(stylus));
            this.canvas.addEventListener('mouseup', stylus.end.bind(stylus));
            this.canvas.addEventListener('touchstart', stylus.start.bind(stylus))
            this.canvas.addEventListener('touchmove', moveHandler.bind(stylus));
            this.canvas.addEventListener('touchend', stylus.end.bind(stylus));
        },

        run: function(debug) {
            this.clear();
        }

    }
}
