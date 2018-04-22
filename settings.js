function Settings(root, settings) {

    // Paste this in the console of a color lovers page to get the rgba values
    // Array.prototype.slice.call(document.querySelectorAll("div.meta > div.col-80.big-number-label > h4")).map(function(i) { return "\"rgba(" + i.innerHTML + ",1)\"" }).join(",\n")

    let defaults = {
        numboids: 5,
        maxSpeed: 6,
        maxForce: 4,
        pallete: [
            "rgba(250,208,137,1)",
            "rgba(255,156,91,1)",
            "rgba(245,99,74,1)",
            "rgba(237,48,60,1)",
        ],
    };

    return {
        settings: Object.assign(defaults, settings),
    };
}
