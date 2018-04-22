function Settings(root, settings) {

    let defaults = {
        numboids: 5,
        maxSpeed: 6,
        maxForce: 4,
        pallete: [
            "rgba(232,221,203,1)",
            "rgba(205,179,128,1)",
            "rgba(3,101,100,1)",
        ],
    };

    return {
        settings: Object.assign(defaults, settings),
    };

}
