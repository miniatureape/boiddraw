let raf = window.requestAnimationFrame;

const DEBUG = true;

function main() {

    window.settings = Settings();
    window.settingsRenderer = SettingsRenderer(document.getElementById('settings-ui'), settings);

    document.querySelector('#controls-toggle').addEventListener('click', function(e) {
        e.target.parentElement.classList.toggle('visible')
    })

    window.runnables = [];

    let drawingContext = document.getElementById('drawing').getContext('2d');
    let renderingContext = document.getElementById('rendering').getContext('2d');

    window.drawingCanvas = Canvas(drawingContext);
    window.drawingCanvas.resize(window.innerWidth, window.innerHeight);

    window.renderingCanvas = Canvas(renderingContext);
    window.renderingCanvas.resize(window.innerWidth, window.innerHeight);

    let path = Path();
    let pathRenderer = PathRenderer(path, drawingContext);

    let stylus = Stylus(path);

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

main();
