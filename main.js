let raf = window.requestAnimationFrame;

const DEBUG = true;

function main() {

    window.settings = Settings();
    window.settingsRenderer = SettingsRenderer(document.getElementById('settings-ui'), settings);

    window.runnables = [];

    let drawingContext = document.getElementById('drawing').getContext('2d');
    let renderingContext = document.getElementById('rendering').getContext('2d');

    window.drawingCanvas = Canvas(drawingContext);
    window.drawingCanvas.resize(window.innerWidth, window.innerHeight);

    window.renderingCanvas = Canvas(renderingContext);
    window.renderingCanvas.resize(window.innerWidth, window.innerHeight);
    window.renderingCanvas.fill('black');


    let path = Path();
    let pathRenderer = PathRenderer(path, drawingContext);

    window.stylus = Stylus(path);

    window.runnables.push(drawingCanvas);
    window.runnables.push(pathRenderer);
    window.drawingCanvas.bindEventsToStylus(stylus);
    stylus.onResults(function(newPath) {
        let flock = Flock(
            renderingContext,
            newPath, 
            settings
        );
        window.runnables = window.runnables.concat(flock);
    });

    window.controls = Controls(
        document.getElementById('controls'),
        renderingContext
    );


    run(0);
}

function dorun() {
    window.runnables.forEach(function(runnable, i) {
        // If a runnable returns true on run its culled.
        if(runnable.run(DEBUG)) {
            runnables.splice(i, 1);
        }
    })
}

function run(ts) {
    dorun();
    raf(run);
}

function demo() {
    console.log(demo);
    let radius = Math.min(window.innerWidth, window.innerHeight) / 3;
    let center = new Vector2d(window.innerWidth / 2, window.innerHeight / 2);
    stylus.start();
    for (let angle = 0; angle < (Math.PI * 2); angle = angle + .15) {
        stylus.move(Vector2d.add(center, new Vector2d(Math.sin(angle) * radius, Math.cos(angle) * radius)));
    }
    stylus.end();
}

console.log('There is an object called stylus');
console.log('You can draw with it using a simple api');
console.log('stylus.start()');
console.log('stylus.move(new Vector2d(10, 10))');
console.log('stylus.move(new Vector2d(500, 500))');
console.log('stylus.end()');
console.log('type demo() to see.');

main();
