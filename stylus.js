function Stylus(path) {

    return {

        path: path,

        drawing: false,

        start: function(v) {
            this.drawing = true;
        },

        end: function() {
            this.drawing = false;
            this.endfn && this.endfn(this.path.copy());
            this.path.clear();
        },

        move: function(v) {
            if (this.drawing) {
                this.path.addPoint(v);
            }
        },

        onResults: function(fn) {
            this.endfn = fn;
        }
    }

}
