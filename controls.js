function Controls(root, renderingContext) {
    let toggle = root.querySelector('#controls-toggle');
    toggle.addEventListener('click', function(e) {
        root.classList.toggle('visible');
    });

    root.querySelector('#save-btn').addEventListener('click', function() {
        window.location = renderingContext.canvas.toDataURL().replace("image/png", "image/octet-stream");
    });
}
