function Settings() {

    // Paste this in the console of a color lovers page to get the rgba values
    // Array.prototype.slice.call(document.querySelectorAll("div.meta > div.col-80.big-number-label > h4")).map(function(i) { return "\"rgba(" + i.innerHTML + ",1)\"" }).join(",\n")
    
    let settings = {
        numboids: {multiplier: .1, value: 50},
        maxSpeed: {multiplier: .12, value: 50},
        maxForce: {multiplier: .08, value: 50},
        ageLimit: {multiplier: 10, value: 50},
        predictionLength: {multiplier: 1, value: 50},
        pathWidth: {multiplier: .2, value: 50},
        damping: {multiplier: 1, value: 50},
        boidSize: {multiplier: .03, value: 50},
    }

    return {
        all: function() {
            return Object.keys(settings).reduce(function(acc, k) {
                acc[k] = this.get(k);
                return acc;
            }.bind(this), {});
        },
        get: function(key) {
            if (key === 'pallete') {
                return [
                    "rgba(250,208,137,1)",
                    "rgba(255,156,91,1)",
                    "rgba(245,99,74,1)",
                    "rgba(237,48,60,1)",
                ];
            }
            return settings[key].value * settings[key].multiplier;
        },
    };
}

function SettingsRenderer(root, settings) {

    function renderProperty(key, val) {
        let rangeEl = document.createElement('input');
        rangeEl.setAttribute('type', 'range');
        rangeEl.setAttribute('value', val);
        rangeEl.setAttribute('min', 1);
        rangeEl.setAttribute('max', 100);
        let label = document.createElement('label');
        label.innerHTML = key;
        let wrapper = document.createElement('div');
        wrapper.appendChild(label);
        wrapper.appendChild(rangeEl);
        return wrapper;
    }

    let s = {
        render: function() {
            root.innerHTML = "";
            Object.keys(settings.all()).forEach(function(k) {
                root.appendChild(renderProperty(k, settings[k]));
            });
        }
    }

    root.addEventListener('change', function() {
        console.log('changed');
    });

    s.render();
}
